/* 
*
*  This is an example implementation of a Flow Non-Fungible Token
*  It is not part of the official standard but it assumed to be
*  similar to how many NFTs would implement the core functionality.
*
*  This contract does not implement any sophisticated classification
*  system for its NFTs. It defines a simple NFT with minimal metadata.
*   
*/


import NonFungibleToken from "./interfaces/NonFungibleToken.interface.cdc"
import MetadataViews from "./interfaces/MetadataViews.interface.cdc"
import ViewResolver from "./interfaces/ViewResolver.interface.cdc"

pub contract ExcluenceNFT: NonFungibleToken, ViewResolver {


    /// The event that is emitted when the contract is created
    pub event ContractInitialized()

    /// The event that is emitted when an NFT is withdrawn from a Collection
    pub event Withdraw(id: UInt64, from: Address?)

    /// The event that is emitted when an NFT is deposited to a Collection
    pub event Deposit(id: UInt64, to: Address?)

    /// Emitted when a new Component struct is created
    pub event ComponentCreated(componentID: UInt32, metadata: {String:String})


    /// Event related to Set
    // 
    /// Emitted when new component set is created
    pub event ProjectCreated(projectID: UInt32)
    /// Emitted when new Component is added to the ComponentSet
    pub event ComponentAddedToProject(projectID: UInt32, componentID: UInt32)
    /// Emitted when a component is retired from the set and cannot be included in the mint
    pub event ComponentRetiredFromProject(
        projectID: UInt32, 
        componentID: UInt32,
        numNFTs: UInt64
    )
    /// Emitted when a projects data is updated
    pub event ProjectDataUpdated(projectID: UInt32)
    /// Emitted when a project is locked and components cannot be added
    pub event ProjectLocked(projectID: UInt32)
    /// Emitted when a Component is minted from a Set
    pub event NFTMinted(
        nftID: UInt64,
        componentID: UInt32,
        projectID: UInt32,
        serialNumber: UInt64
    )
    /// Emitted when a Component is destroyed
    pub event NFTDestroyed(id: UInt64)

    /// Storage and Public Paths
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let AdminStoragePath: StoragePath

    /// Total supply of ExcluenceNFTs in existence
    pub var totalSupply: UInt64

    // Variable size dictionary of Component structs
    access(self) let components: {UInt32: Component}
    
    // Variable size dictionary of Project resources
    access(self) let projects: @{UInt32: Project}

    // The ID that is used to create Components.
    // Every time a Component is created, componentID is assigned
    // to the new Component's ID and then is incremented by 1.
    pub var nextComponentID: UInt32

    // The ID that is used to create Projects. Every time a Project is 
    // created projectID is assigned to the new project's ID and then is
    // incremented by 1
    // A default project will be created at index '0' at the time if initialization
    // all the components that are not assigned to any explicit project
    pub var nextProjectID: UInt32

    // External Base URL for any NFTs created through this contract
    // e.g https://example.com/{nft.id} will direct users to nft's own page
    pub var externalBaseURL: String



    pub struct Display {
        /// The name of the object. 
        ///
        /// This field will be displayed in lists and therefore should
        /// be short an concise.
        ///
        pub let name: String

        /// A written description of the object. 
        ///
        /// This field will be displayed in a detailed view of the object,
        /// so can be more verbose (e.g. a paragraph instead of a single line).
        ///
        pub let description: String

        /// A small thumbnail representation of the object.
        ///
        /// This field should be a web-friendly file (i.e JPEG, PNG)
        /// that can be displayed in lists, link previews, etc.
        ///
        pub let thumbnail: AnyStruct{MetadataViews.File}

        pub let medias: [AnyStruct{MetadataViews.File}]

        init(
            name: String,
            description: String,
            thumbnail: AnyStruct{MetadataViews.File},
            medias: [AnyStruct{MetadataViews.File}]
        ) {
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
            self.medias = medias
        }
    }

    /// Component is struct that holds metadata associated
    /// with a specific future mintable NFT
    pub struct Component {
        // The unique ID for the Component
        pub let componentID: UInt32
        pub let name: String? 
        access(contract) var description: String?
        access(contract) let thumbnail: AnyStruct{MetadataViews.File}
        access(contract) let medias: [AnyStruct{MetadataViews.File}]
        access(contract) let traits: MetadataViews.Traits
        // The royalties associated with component
        // Project and Component both can have royalties defined
        // and Component's royalties is prefered over Project's royalties when minting NFT
        access(contract) var royalties: [MetadataViews.Royalty]

        

        init(
            name: String?,
            thumbnail: AnyStruct{MetadataViews.File},
            description: String?,
            medias: [AnyStruct{MetadataViews.File}], 
            traits: MetadataViews.Traits?,
            royalties: [MetadataViews.Royalty]
        ) {
            self.componentID = ExcluenceNFT.nextComponentID
            self.traits = traits ?? MetadataViews.Traits([])
            self.name = name
            self.thumbnail = thumbnail
            self.medias = medias
            self.description = description
            self.royalties = royalties
            
            emit ComponentCreated(
                componentID: self.componentID,
                metadata: {
                    "name": self.name ?? "",
                    "description": self.description ?? "",
                    "thumbnail": self.thumbnail.uri()
                }
            )

        }

        pub fun updateDescription(desc: String): UInt32 {
            self.description = desc
            ExcluenceNFT.components[self.componentID] = self
            return self.componentID
        }

    }



    pub resource interface ProjectPublic {
        pub let projectID: UInt32
        pub var locked: Bool
        pub var numberMintedPerComponent: {UInt32: UInt64}
        pub let name: String
        pub fun getComponents(): [UInt32]
        pub fun getRetired(): {UInt32: Bool}
        pub fun getNumMintedPerComponent(): {UInt32: UInt64}
        pub fun getNFTCollectionDisplay(): MetadataViews.NFTCollectionDisplay
        pub fun getRoyalties(): [MetadataViews.Royalty]
    }



    // Project is a resource type that contains the functions to add and remove
    // Components from a project and mint the NFTs
    //
    // It is stored in a private field in the contract so that
    // the admin resource can call its method
    //
    // The admin can add Components to a Project so that the set can mint NFTs
    // 
    // Admin can also retire a Component that

    pub resource Project: ProjectPublic {

        // Unique ID for the set
        pub let projectID: UInt32

        // Array of components that are part of this Project
        // When a component is added to the project, its ID gets appended here
        // The ID does not get removed from this array when a component is retired
        access(contract) var components: [UInt32]

        // Map of Component IDs that Indicate if a component in this Project can be minted
        // When a Component is added in a Project, it is mapped to false (not retired)
        // When a Play is retired, this is set to true and cannot be changed
        access(contract) var retired: {UInt32: Bool}

        // Map of Component IDs and index at which the component was added to the project
        // When a Component is added in a Project, it is mapped to `self.components.length`
        // The number will be used to create the complete name `projectName: #{componentIndexInProject}
        access(contract) var componentIndexInProject: {UInt32: Int}

        // Indicated if the Project is currently locked.
        // When the project is created, it is unlocked
        // and Components are allowed to be added to it.  
        // When a project is locked, Compoenents cannot be added.  
        // A Project can never be changed from locked to unlocked,
        // the decision to lock a Project is final.  
        // If a Project is locked, Components cannot be added, but
        // NFTs can still be minted from Components that exists in the Project
        pub var locked: Bool

        // Mapping of Play IDs that indicated the number of NFTs
        // that have been minted for specific Components in this Project.  
        // When a NFT is minted, this value is stored in the NFT to show
        // its place in the Project, e.g 13 of 60
        pub var numberMintedPerComponent: {UInt32: UInt64}

         // Name that should be used when displaying this NFT collection.
        pub let name: String

        // Description that should be used to give an overview of this collection.
        access(contract) var description: String

        // External link to a URL to view more information about this collection.
        access(contract) var externalURL: MetadataViews.ExternalURL

        // Square-sized image to represent this collection.
        access(contract) var squareImage: MetadataViews.Media

        // Banner-sized image for this collection, recommended to have a size near 1200x630.
        access(contract) var bannerImage: MetadataViews.Media

        // Social links to reach this collection's social homepages.
        // Possible keys may be "instagram", "twitter", "discord", etc.
        access(contract) var socials: {String: MetadataViews.ExternalURL}

        // The royalties associated with Project
        // Project and Component both can have royalties defined
        // and Component's royalties is prefered over Project's royalties when minting NFT
        access(contract) var royalties: [MetadataViews.Royalty]





        init(
            projectID: UInt32,
            name: String,
            description: String,
            externalURL: MetadataViews.ExternalURL,
            squareImage: MetadataViews.Media,
            bannerImage: MetadataViews.Media,
            socials: {String: MetadataViews.ExternalURL},
            royalties: [MetadataViews.Royalty]
        ) {
            self.projectID = projectID
            self.components = []
            self.retired = {}
            self.locked = false
            self.numberMintedPerComponent = {}
            self.name = name
            self.description = description
            self.externalURL = externalURL
            self.squareImage = squareImage
            self.bannerImage = bannerImage
            self.socials = socials
            self.royalties = royalties
            self.componentIndexInProject = {}

            emit ProjectCreated(projectID: self.projectID)
        }


        pub fun updateData(
            description: String,
            externalURL: MetadataViews.ExternalURL,
            squareImage: MetadataViews.Media,
            bannerImage: MetadataViews.Media,
            socials: {String: MetadataViews.ExternalURL}
        ) {
            self.description = description
            self.externalURL = externalURL
            self.squareImage = squareImage
            self.bannerImage = bannerImage
            self.socials = socials
            emit ProjectDataUpdated(projectID: self.projectID)
        }


        // addComponent adds a Component to the Project
        //
        // Parameters: componentID: The ID of the Component that is being added
        //
        // The access is limited to the contract which finally be utilized by Admin.
        // Only the Admin can add components to project
        pub fun addComponent(componentID: UInt32) {
            pre {
                ExcluenceNFT.components[componentID] != nil: "Cannot add the Component to Project: Component doesn't exist."
                !self.locked: "Cannot add the Component to the Project after the project has been locked"
                self.numberMintedPerComponent[componentID] == nil: "The component has already been added to the project"
            }

            self.components.append(componentID)
            self.componentIndexInProject[componentID] = self.components.length - 1
            self.retired[componentID] = false
            self.numberMintedPerComponent[componentID] = 0

            emit ComponentAddedToProject(
                projectID: self.projectID,
                componentID: componentID
            )
        }

        // addComponents adds multiple Component to the project at once
        pub fun addComponents(componentIDs: [UInt32]) {
            for componentID in componentIDs {
                self.addComponent(componentID: componentID)
            }
        }

        // retireComponent retires a Component from the Project so that it can't mint new NFTs
        pub fun retireComponent(componentID: UInt32) {
            pre {
                self.retired[componentID] != nil: "Cannot retire the Component: Component doesn't exist in this project!"
            }
            if !self.retired[componentID]! {
                self.retired[componentID] = true
            }

            emit ComponentRetiredFromProject(
                projectID: self.projectID,
                componentID: componentID,
                numNFTs: self.numberMintedPerComponent[componentID]!
            )

        }

        // retireAll retires all the components in the Project
        pub fun retireAll() {
            for componentID in self.components {
                self.retireComponent(componentID: componentID)
            }
        }

        // lock() locks the Project so that no more Components can be added to it
        pub fun lock() {
            if !self.locked {
                self.locked = true
                emit ProjectLocked(projectID: self.projectID)
            }
        }


        // Mints a new NFT and returns the newly minted NFT
        pub fun mintNFT(componentID: UInt32): @NFT {
            pre {
                self.retired[componentID] != nil: "Cannot mint the NFT: This component doesn't exist."
                !self.retired[componentID]!: "Cannot min the NFT: This component has been retired."
            }

            let numInComponent = self.numberMintedPerComponent[componentID] ?? 0
            let nft <- create NFT(
                projectID: self.projectID,
                componentID: componentID,
                serialNumber: numInComponent + 1 
            )
            self.numberMintedPerComponent[componentID] = numInComponent + 1
            return  <- nft
        }

        // mints and arbitrary quantity of NFTs
        pub fun batchMintNFT(componentID: UInt32, quantity: UInt64): @Collection {
            let collection <- create Collection()
            var i: UInt64 = 0
            while i < quantity {    
                collection.deposit(token: <- self.mintNFT(componentID: componentID))
                i = i + 1
            }

            return  <- collection
        }

        pub fun getComponents(): [UInt32] {
            return self.components
        }

        pub fun getRetired(): {UInt32: Bool} {
            return  self.retired
        }

        pub fun getNumMintedPerComponent(): {UInt32: UInt64} {
            return self.numberMintedPerComponent
        }

        pub fun getNFTCollectionDisplay(): MetadataViews.NFTCollectionDisplay {
            return MetadataViews.NFTCollectionDisplay(
                name: self.name,
                description: self.description,
                externalURL: self.externalURL,
                squareImage: self.squareImage,
                bannerImage: self.bannerImage,
                socials: self.socials
            )
        }

        pub fun getRoyalties(): [MetadataViews.Royalty] {
            return self.royalties
        }

    }


    pub struct QueryProjectData {

        pub let projectRef: &Project{ProjectPublic}
        pub let name: String

        init(_ projectID: UInt32) {
            pre {
                ExcluenceNFT.projects[projectID] != nil: "This project with provided ID does not exist."
            }
            self.projectRef = (&ExcluenceNFT.projects[projectID] as &Project{ProjectPublic}?)!
            self.name = self.projectRef.name
        }

        pub fun isLocked(): Bool {
            return self.projectRef.locked
        }

        pub fun getComponents(): [UInt32] {
            return self.projectRef.getComponents()
        }

        pub fun getRetired(): {UInt32: Bool} {
            return  self.projectRef.getRetired()
        }

        pub fun getNumberMintedPerComponent(): {UInt32: UInt64} {
            return  self.projectRef.getNumMintedPerComponent()
        }

        pub fun getNFTCollectionDisplay(): MetadataViews.NFTCollectionDisplay {
            return self.projectRef.getNFTCollectionDisplay()
        }

        pub fun getRoyalties(): [MetadataViews.Royalty] {
            return  self.projectRef.getRoyalties()
        }

        pub fun getFullData(): {String: AnyStruct} {
            return  {
                "projectID": self.projectRef.projectID,
                "display": self.getNFTCollectionDisplay(),
                "components": self.getComponents(),
                "numberMintedPerComponent": self.getNumberMintedPerComponent(),
                "retired": self.getRetired(),
                "royalties": self.getRoyalties(),
                "locked": self.isLocked()
            }
        }

    }

    pub struct NFTUtilsFuncs {
        
        access(self) let id: UInt64 
        access(self) let component: Component
        access(self) let serialNumber: UInt64

        init(
            id: UInt64,
            serialNumber: UInt64,
            component: Component
        ) {
            self.id = id 
            self.serialNumber = serialNumber
            self.component = component
        }

        access(contract) fun buildDescription(name: String): String {
            return "A series from "
                    .concat(name)
                    .concat(" NFT with serial number ")
                    .concat(self.serialNumber.toString())
        }

    }

    /// The core resource that represents a Non Fungible Token. 
    /// New instances will be created using the NFTMinter resource
    /// and stored in the Collection resource
    ///
    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        
        /// The unique ID that each NFT has
        pub let id: UInt64

        pub let projectID: UInt32
        pub let componentID: UInt32
        pub let serialNumber: UInt64

        pub let name: String
        pub let description: String 
        pub let thumbnail: AnyStruct{MetadataViews.File}
        pub let medias: [AnyStruct{MetadataViews.File}]
        access(self) let traits: MetadataViews.Traits
    
        init(
            projectID: UInt32,
            componentID: UInt32,
            serialNumber: UInt64
        ) {
            pre {
                ExcluenceNFT.components[componentID] != nil: "Cannot mint NFT: Component does not exist."
            }
            self.id = ExcluenceNFT.totalSupply
            self.projectID = projectID
            self.componentID = componentID
            self.serialNumber  = serialNumber

            let component = ExcluenceNFT.components[componentID]!
            
            let nftUtils = NFTUtilsFuncs(
                id: self.id,
                serialNumber: self.serialNumber,
                component: component
            )

            let block = getCurrentBlock()

            let projectRef = (&ExcluenceNFT.projects[projectID!] as &Project?)!
            if projectRef.projectID == 0 && component.name == nil {
                panic("Cannot mint NFT: Component must have a name")
            }
            self.name = component.name ?? projectRef.name
            let _desc = projectRef.projectID != 0 ? projectRef.description : nftUtils.buildDescription(name: self.name)
            self.description = component.description ?? _desc
            self.thumbnail = component.thumbnail
            self.medias = component.medias
            self.traits = component.traits
            self.traits.addTrait(
                MetadataViews.Trait(
                    name: "mintedTime", 
                    value: block.timestamp,
                    displayTime: "Date",
                    rarity: nil
                )
            )

            emit NFTMinted(
                nftID: self.id,
                componentID: self.componentID,
                projectID: self.projectID,
                serialNumber: self.serialNumber
            )
        }

        destroy() {
            emit NFTDestroyed(id: self.id)
        }

        /// Function that returns all the Metadata Views implemented by a Non Fungible Token
        ///
        /// @return An array of Types defining the implemented views. This value will be used by
        ///         developers to know which parameter to pass to the resolveView() method.
        ///
        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
                Type<Display>(),
                Type<MetadataViews.Royalties>(),
                Type<MetadataViews.Editions>(),
                Type<MetadataViews.ExternalURL>(),
                Type<MetadataViews.NFTCollectionData>(),
                Type<MetadataViews.NFTCollectionDisplay>(),
                Type<MetadataViews.Serial>(),
                Type<MetadataViews.Traits>()
            ]
        }


        


        /// Function that resolves a metadata view for this token.
        ///
        /// @param view: The Type of the desired view.
        /// @return A structure representing the requested view.
        ///
        pub fun resolveView(_ view: Type): AnyStruct? {
            let component = ExcluenceNFT.components[self.componentID]!
            let projectRef = (&ExcluenceNFT.projects[self.projectID] as &Project{ProjectPublic}?)!
            switch view {
                case Type<MetadataViews.Display>():
                    return MetadataViews.Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: self.thumbnail
                    )
                case Type<Display>():
                    return Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: self.thumbnail,
                        medias: self.medias
                    )
                case Type<MetadataViews.Editions>():
                    // There is no max number of NFTs that can be minted from this contract
                    // so the max edition field value is set to nil
                    let editionInfo = MetadataViews.Edition(
                        name: self.getEditionName(component: component, projectRef: projectRef), 
                        number: self.serialNumber, 
                        max: self.getEditionMax(projectRef: projectRef, componentID: self.componentID)
                    )
                    let editionList: [MetadataViews.Edition] = [editionInfo]
                    return MetadataViews.Editions(
                        editionList
                    )
                case Type<MetadataViews.Serial>():
                    return MetadataViews.Serial(
                        self.serialNumber
                    )
                case Type<MetadataViews.Royalties>():
                    return MetadataViews.Royalties(
                        component.royalties.length > 0 ? component.royalties 
                            : projectRef.getRoyalties()
                    )
                case Type<MetadataViews.ExternalURL>():
                    return MetadataViews.ExternalURL(ExcluenceNFT.externalBaseURL.concat(self.id.toString()))
                case Type<MetadataViews.NFTCollectionData>():
                    return MetadataViews.NFTCollectionData(
                        storagePath: ExcluenceNFT.CollectionStoragePath,
                        publicPath: ExcluenceNFT.CollectionPublicPath,
                        providerPath: /private/ExcluenceNFTCollection,
                        publicCollection: Type<&ExcluenceNFT.Collection{ExcluenceNFT.ExcluenceNFTCollectionPublic}>(),
                        publicLinkedType: Type<&ExcluenceNFT.Collection{ExcluenceNFT.ExcluenceNFTCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(),
                        providerLinkedType: Type<&ExcluenceNFT.Collection{ExcluenceNFT.ExcluenceNFTCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(),
                        createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
                            return <-ExcluenceNFT.createEmptyCollection()
                        })
                    )
                case Type<MetadataViews.NFTCollectionDisplay>():
                    return projectRef.getNFTCollectionDisplay()
                case Type<MetadataViews.Traits>():
                    return  self.traits

            }
            return nil
        }

        // getEditionName NFT's edition name is a combination of the NFT's project Name and component ID
        // `setName: #componentID
        pub fun getEditionName(component: Component, projectRef: &Project{ProjectPublic} ): String {
            let projectName = projectRef.name
            let editionName = projectName.concat(": #").concat(component.componentID.toString())
            return  editionName
        }

        pub fun getEditionMax(projectRef: &Project{ProjectPublic}, componentID: UInt32): UInt64? {
            return projectRef.getNumMintedPerComponent()[componentID]
        }

    }

    /// Defines the methods that are particular to this NFT contract collection
    ///
    pub resource interface ExcluenceNFTCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowExcluenceNFT(id: UInt64): &ExcluenceNFT.NFT? {
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow ExcluenceNFT reference: the ID of the returned reference is incorrect"
            }
        }
    }

    /// The resource that will be holding the NFTs inside any account.
    /// In order to be able to manage NFTs any account will need to create
    /// an empty collection first
    ///
    pub resource Collection: ExcluenceNFTCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
        // dictionary of NFT conforming tokens
        // NFT is a resource type with an `UInt64` ID field
        pub var ownedNFTs: @{UInt64: NonFungibleToken.NFT}

        init () {
            self.ownedNFTs <- {}
        }

        /// Removes an NFT from the collection and moves it to the caller
        ///
        /// @param withdrawID: The ID of the NFT that wants to be withdrawn
        /// @return The NFT resource that has been taken out of the collection
        ///
        pub fun withdraw(withdrawID: UInt64): @NonFungibleToken.NFT {
            let token <- self.ownedNFTs.remove(key: withdrawID) ?? panic("missing NFT")

            emit Withdraw(id: token.id, from: self.owner?.address)

            return <-token
        }

        /// Adds an NFT to the collections dictionary and adds the ID to the id array
        ///
        /// @param token: The NFT resource to be included in the collection
        /// 
        pub fun deposit(token: @NonFungibleToken.NFT) {
            let token <- token as! @ExcluenceNFT.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            // Only emit a deposit event if the Collection 
            // is in an account's storage
            if self.owner?.address != nil {
                emit Deposit(id: id, to: self.owner?.address)
            }

            destroy oldToken
        }

        // batchDeposit takes a Collection object as an argument
        // and deposits each contained NFT into this Collection
        pub fun batchDeposit(tokens: @NonFungibleToken.Collection) {

            // Get an array of the IDs to be deposited
            let keys = tokens.getIDs()

            // Iterate through the keys in the collection and deposit each one
            for key in keys {
                self.deposit(token: <-tokens.withdraw(withdrawID: key))
            }

            // Destroy the empty Collection
            destroy tokens
        }

        /// Helper method for getting the collection IDs
        ///
        /// @return An array containing the IDs of the NFTs in the collection
        ///
        pub fun getIDs(): [UInt64] {
            return self.ownedNFTs.keys
        }

        /// Gets a reference to an NFT in the collection so that 
        /// the caller can read its metadata and call its methods
        ///
        /// @param id: The ID of the wanted NFT
        /// @return A reference to the wanted NFT resource
        ///
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT {
            return (&self.ownedNFTs[id] as &NonFungibleToken.NFT?)!
        }
 
        /// Gets a reference to an NFT in the collection so that 
        /// the caller can read its metadata and call its methods
        ///
        /// @param id: The ID of the wanted NFT
        /// @return A reference to the wanted NFT resource
        ///        
        pub fun borrowExcluenceNFT(id: UInt64): &ExcluenceNFT.NFT? {
            if self.ownedNFTs[id] != nil {
                // Create an authorized reference to allow downcasting
                let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return ref as! &ExcluenceNFT.NFT
            }

            return nil
        }

        /// Gets a reference to the NFT only conforming to the `{MetadataViews.Resolver}`
        /// interface so that the caller can retrieve the views that the NFT
        /// is implementing and resolve them
        ///
        /// @param id: The ID of the wanted NFT
        /// @return The resource reference conforming to the Resolver interface
        /// 
        pub fun borrowViewResolver(id: UInt64): &AnyResource{MetadataViews.Resolver} {
            let nft = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
            let ExcluenceNFT = nft as! &ExcluenceNFT.NFT
            return ExcluenceNFT as &AnyResource{MetadataViews.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }

    /// Admin is special authorization resource that
    // allows the owner to perform important functions to modify
    // various aspects of the Components, Projects and NFTs
    pub resource Admin {
        
        // Creates a new Component struct
        // and stores it in the Components dictionary and increase the nextComponentID
        pub fun createComponent(
            name: String?,
            description: String?,
            thumbnail: AnyStruct{MetadataViews.File},
            medias: [AnyStruct{MetadataViews.File}],
            traits: MetadataViews.Traits?,
            royalties: [MetadataViews.Royalty]
        ): UInt32 {
            let component = Component(
                name: name,
                thumbnail: thumbnail,
                description: description,
                medias: medias,
                traits: traits,
                royalties: royalties,
            )
            ExcluenceNFT.nextComponentID = ExcluenceNFT.nextComponentID + UInt32(1)
            ExcluenceNFT.components[component.componentID] = component
            return  component.componentID
        }

        // Updates external URL
        pub fun updateExternalBaseURL(externalBaseURL: String) {
            ExcluenceNFT.externalBaseURL = externalBaseURL
        }


        pub fun updateComponentDesc(componentID: UInt32, description: String): UInt32 {
            let component =  ExcluenceNFT.components[componentID] 
                ?? panic("componentID does not exist.")
            return component.updateDescription(desc: description)
        }

        pub fun createProject(
            name: String,
            description: String,
            externalURL: MetadataViews.ExternalURL,
            squareImage: MetadataViews.Media,
            bannerImage: MetadataViews.Media,
            socials: {String: MetadataViews.ExternalURL},
            royalties: [MetadataViews.Royalty]
        ): UInt32 {
            var project <- create Project(
                projectID: ExcluenceNFT.nextProjectID,
                name: name,
                description: description,
                externalURL: externalURL,
                squareImage: squareImage,
                bannerImage: bannerImage,
                socials: socials,
                royalties: royalties
            )
            let projectID = ExcluenceNFT.nextProjectID
            ExcluenceNFT.nextProjectID = ExcluenceNFT.nextProjectID + UInt32(1)
            ExcluenceNFT.projects[project.projectID] <-! project
            return projectID
        }

        pub fun updateProjectData(projectID: UInt32, 
            description: String,
            externalURL: MetadataViews.ExternalURL,
            squareImage: MetadataViews.Media,
            bannerImage: MetadataViews.Media,
            socials: {String: MetadataViews.ExternalURL}
                
            ) {
            pre {
                ExcluenceNFT.projects[projectID] != nil: "Cannot update project: This project doesn't exist."
            }
            let projectRef = self.borrowProject(projectID: projectID)
            projectRef.updateData(description: description, externalURL: externalURL, squareImage: squareImage, bannerImage: bannerImage, socials: socials)
        }

        // borrowProject returens a reference to a project in the ExcluenceNFT
        // contract so that the admin can call methods on it
        pub fun borrowProject(projectID: UInt32): &Project {
            pre {
                ExcluenceNFT.projects[projectID] != nil: "Cannot borrow Project: The project doesn't exist."
            }
            return (&ExcluenceNFT.projects[projectID] as &Project?)!

        }


        pub fun lockProject(projectID: UInt32) {
            pre {
                ExcluenceNFT.projects[projectID] != nil: "Cannot update project: This project doesn't exist."
            }
            let projectRef = self.borrowProject(projectID: projectID)
            projectRef.lock()
        }

        pub fun createNewAdmin(): @Admin {
            return  <- create Admin()
        }

    }

    

    /// Allows anyone to create a new empty collection
    ///
    /// @return The new Collection resource
    ///
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    pub fun getAllComponents(): [Component] {
        return self.components.values
    }

    pub fun dictToMedia(_ dict: {String: String}): MetadataViews.Media {
        pre {
            dict["fileType"] != nil: "Failed to create media from dict: type is missing"
            dict["mediaType"] != nil: "Failed to create media from dict: mediaType is missing"
        }
        if dict["fileType"] == "https" {
            if dict["url"] == nil {
                panic("Failed to create media from dict: url is missing")
            }
            return MetadataViews.Media(
                file: MetadataViews.HTTPFile(
                    url: dict["url"]!
                ),
                mediaType: dict["mediaType"]!
            )
        }

        if dict["cid"] == nil {
            panic("Failed to create media from dict: cid is missing")
        }

        return MetadataViews.Media(
            file: MetadataViews.IPFSFile(
                cid: dict["cid"]!,
                path: dict["path"]
            ),
            mediaType: dict["mediaType"]!
        )
    }




    // returns all the projects in the contract
    pub fun getAllProjectsData(): [{String: AnyStruct}] {
        let projects: [{String: AnyStruct}] = []
        for projectID in self.projects.keys {
            let queryProjectData = QueryProjectData(projectID)
            projects.append(queryProjectData.getFullData())
        }
        return  projects
    }

    pub fun getQueryProjectData(projectID: UInt32): QueryProjectData {
        return QueryProjectData(projectID)
    }

    pub fun getComponentIDsInProject(projectID: UInt32): [UInt32] {
        return QueryProjectData(projectID).getComponents()
    }
    

    // returns a boolean that indicated is a Project/Component combo is retired
    // Returns true if it is retired
    pub fun isEditionRetired(projectID: UInt32, componentID: UInt32): Bool {
        let queryProjectData = self.getQueryProjectData(projectID: projectID)
        return queryProjectData.getRetired()[componentID] == true
    }


    /// Function that resolves a metadata view for this contract.
    ///
    /// @param view: The Type of the desired view.
    /// @return A structure representing the requested view.
    ///
    pub fun resolveView(_ view: Type): AnyStruct? {
        return self.resolveProjectView(view, projectID: 0)
    }

    pub fun resolveProjectView(_ view: Type, projectID: UInt32): AnyStruct? {
        switch view {
            case Type<MetadataViews.NFTCollectionData>():
                return MetadataViews.NFTCollectionData(
                    storagePath: ExcluenceNFT.CollectionStoragePath,
                    publicPath: ExcluenceNFT.CollectionPublicPath,
                    providerPath: /private/ExcluenceNFTCollection,
                    publicCollection: Type<&ExcluenceNFT.Collection{ExcluenceNFT.ExcluenceNFTCollectionPublic}>(),
                    publicLinkedType: Type<&ExcluenceNFT.Collection{ExcluenceNFT.ExcluenceNFTCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(),
                    providerLinkedType: Type<&ExcluenceNFT.Collection{ExcluenceNFT.ExcluenceNFTCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(),
                    createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
                        return <-ExcluenceNFT.createEmptyCollection()
                    })
                )
            case Type<MetadataViews.NFTCollectionDisplay>():
                let projectRef = (&ExcluenceNFT.projects[projectID] as &Project?)! as &Project
                return projectRef.getNFTCollectionDisplay()
        }
        return  nil
    }

    /// Function that returns all the Metadata Views implemented by a Non Fungible Token
    ///
    /// @return An array of Types defining the implemented views. This value will be used by
    ///         developers to know which parameter to pass to the resolveView() method.
    ///
    pub fun getViews(): [Type] {
        return [
            Type<MetadataViews.NFTCollectionData>(),
            Type<MetadataViews.NFTCollectionDisplay>()
        ]
    }



    init(
        
    ) {
        // Initialize the total supply
        self.totalSupply = 0
        self.components = {}
        self.projects <- {}
        self.nextComponentID = 1
        self.nextProjectID = 0
        //TODO: Add function to update external Base URL
        self.externalBaseURL = ""


        // Set the named paths
        self.CollectionStoragePath = /storage/ExcluenceNFTCollection
        self.CollectionPublicPath = /public/ExcluenceNFTCollection
        self.AdminStoragePath = /storage/ExcluenceNFTAdmin


        if self.account.borrow<&ExcluenceNFT.Collection>(from: ExcluenceNFT.CollectionStoragePath) == nil {

            // Create a Collection resource and save it to storage
            let collection <- create Collection()
            self.account.save(<-collection, to: self.CollectionStoragePath)

            // create a public capability for the collection
            self.account.link<&ExcluenceNFT.Collection{NonFungibleToken.CollectionPublic, ExcluenceNFT.ExcluenceNFTCollectionPublic, MetadataViews.ResolverCollection}>(
                self.CollectionPublicPath,
                target: self.CollectionStoragePath
            )
        }


        //TODO: Add Admin capability and create Project 0
        let admin <- create Admin()
        admin.createProject(
            name: self.account.address.toString(), 
            description: "The default project on Excluence NFT", 
            externalURL: MetadataViews.ExternalURL(""), 
            squareImage: MetadataViews.Media(
                file: MetadataViews.HTTPFile(url: ""),
                mediaType: "image/*"
            ), 
            bannerImage: MetadataViews.Media(
                file: MetadataViews.HTTPFile(url: ""),
                mediaType: "image/*"
            ),
            socials: {},
            royalties: []
        )
        self.account.save(<- admin, to: self.AdminStoragePath)

   
        emit ContractInitialized()
    }
}
 