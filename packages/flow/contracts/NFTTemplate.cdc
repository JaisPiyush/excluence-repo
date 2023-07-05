import NonFungibleToken from "./interfaces/NonFungibleToken.interface.cdc"
import MetadataViews from "./interfaces/MetadataViews.interface.cdc"
import ViewResolver from "./interfaces/ViewResolver.interface.cdc"

pub contract NFTTemplate: NonFungibleToken, ViewResolver {

    /// Total supply of NFTTemplates in existence
    pub var totalSupply: UInt64

    /// The event that is emitted when the contract is created
    pub event ContractInitialized()

    /// The event that is emitted when an NFT is withdrawn from a Collection
    pub event Withdraw(id: UInt64, from: Address?)

    /// The event that is emitted when an NFT is deposited to a Collection
    pub event Deposit(id: UInt64, to: Address?)

    /// Emitted when collection details are initialized
    pub event CollectionDetailsInitialized()

    /// Emitted when Collection Details are updated
    pub event CollectionDetailsUpdated()

    /// Storage and Public Paths
    pub let CollectionStoragePath: StoragePath
    pub let CollectionPublicPath: PublicPath
    pub let MinterStoragePath: StoragePath




    // Collection details struct is stored in the contract
    access(contract) let collectionDetails: CollectionDetails

    // Retains the number of NFTs minted serialy. e.g 13 of 200
    // The values will be updated from batchMint operator in the NFTMinter resource
    // For single mint the value will be `nil`
    // The key will be called mintKeyID
    access(contract) let nftMintNumberCount: {UInt64: UInt64}


    pub struct interface CollectionDetailsPublic {
        pub let name: String 
        
        pub fun getCollectionDisplay(): MetadataViews.NFTCollectionDisplay
        pub fun getRoyalties(): MetadataViews.Royalties
    }

    pub struct CollectionDetails: CollectionDetailsPublic {
        pub let name: String
        pub var description: String
        pub var externalURL: String
        pub var squareImage: MetadataViews.Media
        pub var bannerImage: MetadataViews.Media
        pub var socials: {String: MetadataViews.ExternalURL}
        pub var royalties: [MetadataViews.Royalty]

        init(
            name: String,
            description: String,
            externalURL: String,
            squareImage: MetadataViews.Media,
            bannerImage: MetadataViews.Media,
            socials: {String: MetadataViews.ExternalURL},
            royalties: [MetadataViews.Royalty]
        ) {
            self.name = name
            self.description = description
            self.squareImage = squareImage
            self.externalURL = externalURL
            self.bannerImage = bannerImage
            self.socials = socials
            self.royalties = royalties

            emit CollectionDetailsInitialized()
        }

        pub fun getCollectionDisplay(): MetadataViews.NFTCollectionDisplay {
            return  MetadataViews.NFTCollectionDisplay(
                name: self.name,
                description: self.description,
                externalURL: MetadataViews.ExternalURL(self.externalURL),
                squareImage: self.squareImage,
                bannerImage: self.bannerImage,
                socials: self.socials,
            )
        }

        pub fun getRoyalties(): MetadataViews.Royalties {
            return MetadataViews.Royalties(self.royalties)
        }

        pub fun updateDetails(collectionDetails: CollectionDetails) {
            self.description = collectionDetails.description
            self.externalURL = collectionDetails.externalURL
            self.squareImage = collectionDetails.squareImage
            self.bannerImage = collectionDetails.bannerImage
            self.socials = collectionDetails.socials
            self.royalties = collectionDetails.royalties

            emit CollectionDetailsUpdated()
        }




    }



    /// The core resource that represents a Non Fungible Token. 
    /// New instances will be created using the NFTMinter resource
    /// and stored in the Collection resource
    ///
    pub resource NFT: NonFungibleToken.INFT, MetadataViews.Resolver {
        
        /// The unique ID that each NFT has
        pub let id: UInt64

        /// Metadata fields
        pub let name: String
        pub let description: String
        pub let thumbnail: String
        access(self) let royalties: [MetadataViews.Royalty]
        access(self) let metadata: {String: AnyStruct}
        pub let serialNumber: UInt64
        pub let mintKeyID: UInt64
    
        init(
            id: UInt64,
            name: String,
            description: String,
            thumbnail: String,
            royalties: [MetadataViews.Royalty],
            metadata: {String: AnyStruct},
            serialNumber: UInt64,
            mintKeyID: UInt64
        ) {
            self.id = id
            self.name = name
            self.description = description
            self.thumbnail = thumbnail
            self.royalties = royalties
            self.metadata = metadata
            self.serialNumber = serialNumber
            self.mintKeyID = mintKeyID
        }

        /// Function that returns all the Metadata Views implemented by a Non Fungible Token
        ///
        /// @return An array of Types defining the implemented views. This value will be used by
        ///         developers to know which parameter to pass to the resolveView() method.
        ///
        pub fun getViews(): [Type] {
            return [
                Type<MetadataViews.Display>(),
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
            switch view {
                case Type<MetadataViews.Display>():

                    let protocol = self.thumbnail.slice(from: 0, upTo: 4)
                    let thumbnail = protocol == "http" ? MetadataViews.HTTPFile(
                        url: self.thumbnail
                    ): MetadataViews.IPFSFile(cid: self.thumbnail, path: nil)
                    return MetadataViews.Display(
                        name: self.name,
                        description: self.description,
                        thumbnail: thumbnail
                    )
                case Type<MetadataViews.Editions>():
                    // There is no max number of NFTs that can be minted from this contract
                    // so the max edition field value is set to nil
                    let editionInfo = MetadataViews.Edition(
                        name: NFTTemplate.collectionDetails.name, 
                        number: self.serialNumber, 
                        max: NFTTemplate.nftMintNumberCount[self.mintKeyID]
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
                        self.royalties
                    )
                case Type<MetadataViews.ExternalURL>():
                    return MetadataViews.ExternalURL(NFTTemplate.collectionDetails.externalURL.concat(self.id.toString()))
                case Type<MetadataViews.NFTCollectionData>():
                    return MetadataViews.NFTCollectionData(
                        storagePath: NFTTemplate.CollectionStoragePath,
                        publicPath: NFTTemplate.CollectionPublicPath,
                        providerPath: /private/NFTTemplateCollection,
                        publicCollection: Type<&NFTTemplate.Collection{NFTTemplate.NFTTemplateCollectionPublic}>(),
                        publicLinkedType: Type<&NFTTemplate.Collection{NFTTemplate.NFTTemplateCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(),
                        providerLinkedType: Type<&NFTTemplate.Collection{NFTTemplate.NFTTemplateCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(),
                        createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
                            return <-NFTTemplate.createEmptyCollection()
                        })
                    )
                case Type<MetadataViews.NFTCollectionDisplay>():
                    return  NFTTemplate.collectionDetails.getCollectionDisplay()
                case Type<MetadataViews.Traits>():
                    // exclude mintedTime and foo to show other uses of Traits
                    let excludedTraits = ["mintedTime"]
                    let traitsView = MetadataViews.dictToTraits(dict: self.metadata, excludedNames: excludedTraits)

                    // mintedTime is a unix timestamp, we should mark it with a displayType so platforms know how to show it.
                    let mintedTimeTrait = MetadataViews.Trait(name: "mintedTime", value: self.metadata["mintedTime"]!, displayType: "Date", rarity: nil)
                    traitsView.addTrait(mintedTimeTrait)
   
                    return traitsView

            }
            return nil
        }
    }

    /// Defines the methods that are particular to this NFT contract collection
    ///
    pub resource interface NFTTemplateCollectionPublic {
        pub fun deposit(token: @NonFungibleToken.NFT)
        pub fun getIDs(): [UInt64]
        pub fun borrowNFT(id: UInt64): &NonFungibleToken.NFT
        pub fun borrowNFTTemplate(id: UInt64): &NFTTemplate.NFT? {
            post {
                (result == nil) || (result?.id == id):
                    "Cannot borrow NFTTemplate reference: the ID of the returned reference is incorrect"
            }
        }
    }

    /// The resource that will be holding the NFTs inside any account.
    /// In order to be able to manage NFTs any account will need to create
    /// an empty collection first
    ///
    pub resource Collection: NFTTemplateCollectionPublic, NonFungibleToken.Provider, NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, MetadataViews.ResolverCollection {
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
            let token <- token as! @NFTTemplate.NFT

            let id: UInt64 = token.id

            // add the new token to the dictionary which removes the old one
            let oldToken <- self.ownedNFTs[id] <- token

            emit Deposit(id: id, to: self.owner?.address)

            destroy oldToken
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
        pub fun borrowNFTTemplate(id: UInt64): &NFTTemplate.NFT? {
            if self.ownedNFTs[id] != nil {
                // Create an authorized reference to allow downcasting
                let ref = (&self.ownedNFTs[id] as auth &NonFungibleToken.NFT?)!
                return ref as! &NFTTemplate.NFT
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
            let _nFTTemplate = nft as! &NFTTemplate.NFT
            return _nFTTemplate as &AnyResource{MetadataViews.Resolver}
        }

        destroy() {
            destroy self.ownedNFTs
        }
    }




    /// Allows anyone to create a new empty collection
    ///
    /// @return The new Collection resource
    ///
    pub fun createEmptyCollection(): @NonFungibleToken.Collection {
        return <- create Collection()
    }

    pub resource interface AdminInterface {

        pub fun batchMintNFT(
            recipient: &{NonFungibleToken.CollectionPublic},
            quantity: UInt64,
            name: String,
            description: String,
            thumbnail: String,
            royalties: [MetadataViews.Royalty],
            metadata: {String: AnyStruct},
        )

        pub fun getCollectionDetails(): CollectionDetails

        pub fun updateCollectionDetails(collectionDetails: CollectionDetails)
    }
    /// Resource that an admin or something similar would own to be
    /// able to mint new NFTs
    ///
    pub resource NFTMinter: AdminInterface {

          
        access(contract) fun _mintNFT(
            recipient: &{NonFungibleToken.CollectionPublic},
            name: String,
            description: String,
            thumbnail: String,
            royalties: [MetadataViews.Royalty],
            metadata: {String: AnyStruct},
            serialNumber: UInt64,
            mintKeyID: UInt64
        ): @NFTTemplate.NFT {
            let currentBlock = getCurrentBlock()
            metadata["mintedBlock"] = currentBlock.height
            metadata["mintedTime"] = currentBlock.timestamp
            metadata["minter"] = recipient.owner!.address

            let _royalties = royalties.length > 0 ? royalties: NFTTemplate.collectionDetails.royalties;

            // create a new NFT
            var newNFT <- create NFT(
                id: NFTTemplate.totalSupply,
                name: name,
                description: description,
                thumbnail: thumbnail,
                royalties: _royalties,
                metadata: metadata,
                serialNumber: serialNumber,
                mintKeyID: mintKeyID

            )

            NFTTemplate.totalSupply = NFTTemplate.totalSupply + UInt64(1)
            return <-newNFT
        }


        pub fun batchMintNFT(
            recipient: &{NonFungibleToken.CollectionPublic},
            quantity: UInt64,
            name: String,
            description: String,
            thumbnail: String,
            royalties: [MetadataViews.Royalty],
            metadata: {String: AnyStruct},
        ) {
            var i: UInt64 = 0

            let mintKeyID = UInt64(NFTTemplate.nftMintNumberCount.length)
            NFTTemplate.nftMintNumberCount[mintKeyID] = 0
            while i < quantity {
                NFTTemplate.nftMintNumberCount[mintKeyID] = NFTTemplate.nftMintNumberCount[mintKeyID]! + 1
                recipient.deposit(token: <- self._mintNFT(
                    recipient: recipient, 
                    name: name, 
                    description: description, 
                    thumbnail: thumbnail, 
                    royalties: royalties,
                    metadata: metadata,
                    serialNumber: NFTTemplate.nftMintNumberCount[mintKeyID]!, 
                    mintKeyID: mintKeyID
                ))

                
            }

        }

        /// Mints a new NFT with a new ID and deposit it in the
        /// recipients collection using their collection reference
        ///
        /// @param recipient: A capability to the collection where the new NFT will be deposited
        /// @param name: The name for the NFT metadata
        /// @param description: The description for the NFT metadata
        /// @param thumbnail: The thumbnail for the NFT metadata
        /// @param royalties: An array of Royalty structs, see MetadataViews docs    
        pub fun mintNFT(
            recipient: &{NonFungibleToken.CollectionPublic},
            name: String,
            description: String,
            thumbnail: String,
            royalties: [MetadataViews.Royalty],
            metadata: {String: AnyStruct},
        ) {
            let mintKeyID = UInt64(NFTTemplate.nftMintNumberCount.length)
            NFTTemplate.nftMintNumberCount[mintKeyID] = 1
            let newNFT  <-self._mintNFT(
                recipient: recipient, 
                name: name, 
                description: description, 
                thumbnail: thumbnail, 
                royalties: royalties, 
                metadata: metadata,
                serialNumber: 1, 
                mintKeyID: mintKeyID
            )
            recipient.deposit(token: <- newNFT)
            
        }


        pub fun getCollectionDetails(): CollectionDetails {
            return NFTTemplate.collectionDetails
        }

        pub fun updateCollectionDetails(collectionDetails: CollectionDetails) {
            NFTTemplate.collectionDetails.updateDetails(collectionDetails: collectionDetails)
        }



    }

    /// Function that resolves a metadata view for this contract.
    ///
    /// @param view: The Type of the desired view.
    /// @return A structure representing the requested view.
    ///
    pub fun resolveView(_ view: Type): AnyStruct? {
        switch view {
            case Type<MetadataViews.NFTCollectionData>():
                return MetadataViews.NFTCollectionData(
                    storagePath: NFTTemplate.CollectionStoragePath,
                    publicPath: NFTTemplate.CollectionPublicPath,
                    providerPath: /private/NFTTemplateCollection,
                    publicCollection: Type<&NFTTemplate.Collection{NFTTemplate.NFTTemplateCollectionPublic}>(),
                    publicLinkedType: Type<&NFTTemplate.Collection{NFTTemplate.NFTTemplateCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Receiver,MetadataViews.ResolverCollection}>(),
                    providerLinkedType: Type<&NFTTemplate.Collection{NFTTemplate.NFTTemplateCollectionPublic,NonFungibleToken.CollectionPublic,NonFungibleToken.Provider,MetadataViews.ResolverCollection}>(),
                    createEmptyCollectionFunction: (fun (): @NonFungibleToken.Collection {
                        return <-NFTTemplate.createEmptyCollection()
                    })
                )
            case Type<MetadataViews.NFTCollectionDisplay>():
                return self.collectionDetails.getCollectionDisplay()
        }
        return nil
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

    // Returns true if the contract follows ExcluenceNFTTemplate
    pub fun isExcluenceNFTTemplate(): Bool {
        return true
    }


    init(
        name: String,
        description: String,
        externalURL: String,
        squareImage: MetadataViews.Media,
        bannerImage: MetadataViews.Media,
        socials: {String: MetadataViews.ExternalURL},
        royalties: [MetadataViews.Royalty]
        
    ) {
        // Initialize the total supply
        self.totalSupply = 0

        // Set the named paths
        self.CollectionStoragePath = /storage/NFTTemplateCollection
        self.CollectionPublicPath = /public/NFTTemplateCollection
        self.MinterStoragePath = /storage/NFTTemplateMinter

        // Create a Collection resource and save it to storage
        let collection <- create Collection()
        self.account.save(<-collection, to: self.CollectionStoragePath)

        self.collectionDetails = CollectionDetails(
            name: name,
            description: description,
            externalURL: externalURL,
            squareImage: squareImage,
            bannerImage: bannerImage,
            socials: socials,
            royalties: royalties
        )

        self.nftMintNumberCount = {}

        // create a public capability for the collection
        self.account.link<&NFTTemplate.Collection{NonFungibleToken.CollectionPublic, NFTTemplate.NFTTemplateCollectionPublic, MetadataViews.ResolverCollection}>(
            self.CollectionPublicPath,
            target: self.CollectionStoragePath
        )

        // Create a Minter resource and save it to storage
        let minter <- create NFTMinter()
        self.account.save(<-minter, to: self.MinterStoragePath)

        emit ContractInitialized()
    }
}