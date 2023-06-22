import NonFungibleToken from "./NonFungibleToken.interface.cdc"
import MetadataViews from "./MetadataViews.interface.cdc"
import ViewResolver from "./ViewResolver.interface.cdc"


pub contract interface ExcluenceNFTInterface {

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

    pub struct interface Display {
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

    }

    

    /// Component is struct that holds metadata associated
    /// with a specific future mintable NFT
    pub struct interface Component {
        // The unique ID for the Component
        pub let componentID: UInt32
        pub let name: String? 
        pub var description: String?
        pub let thumbnail: AnyStruct{MetadataViews.File}
        pub let medias: [AnyStruct{MetadataViews.File}]
        pub let traits: MetadataViews.Traits
        // The royalties associated with component
        // Project and Component both can have royalties defined
        // and Component's royalties is prefered over Project's royalties when minting NFT
        pub var royalties: [MetadataViews.Royalty]
    }

    pub resource interface ProjectPublic {

        // Unique ID for the set
        pub let projectID: UInt32


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
        pub var description: String

        // External link to a URL to view more information about this collection.
        pub var externalURL: MetadataViews.ExternalURL

        // Square-sized image to represent this collection.
        pub var squareImage: MetadataViews.Media

        // Banner-sized image for this collection, recommended to have a size near 1200x630.
        pub var bannerImage: MetadataViews.Media

        // Social links to reach this collection's social homepages.
        // Possible keys may be "instagram", "twitter", "discord", etc.
        pub var socials: {String: MetadataViews.ExternalURL}

        // The royalties associated with Project
        // Project and Component both can have royalties defined
        // and Component's royalties is prefered over Project's royalties when minting NFT
        pub var royalties: [MetadataViews.Royalty]

        pub fun getComponents(): [UInt32]
        pub fun getRetired(): {UInt32: Bool}
        pub fun getNumMintedPerComponent(): {UInt32: UInt64}
        pub fun getNFTCollectionDisplay(): MetadataViews.NFTCollectionDisplay
        pub fun getRoyalties(): [MetadataViews.Royalty]


    }

    pub struct interface QueryProjectData {

        pub let projectRef: &AnyResource{ExcluenceNFTInterface.ProjectPublic}

        pub fun isLocked(): Bool 

        pub fun getComponents(): [UInt32] 

        pub fun getRetired(): {UInt32: Bool}

        pub fun getNumberMintedPerComponent(): {UInt32: UInt64} 

        pub fun getNFTCollectionDisplay(): MetadataViews.NFTCollectionDisplay 

        pub fun getRoyalties(): [MetadataViews.Royalty] 

        pub fun getFullData(): {String: AnyStruct} 
    }

    pub fun getAllComponents(): [AnyStruct{Component}]
    pub fun getAllProjectsData(): [{String: AnyStruct}]
    pub fun getQueryProjectData(projectID: UInt32): AnyStruct{QueryProjectData}
    pub fun getComponentIDsInProject(projectID: UInt32): [UInt32]
    pub fun isEditionRetired(projectID: UInt32, componentID: UInt32): Bool
    pub fun resolveProjectView(_ view: Type, projectID: UInt32): AnyStruct?
}