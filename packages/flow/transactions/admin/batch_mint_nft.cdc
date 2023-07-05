import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"
import NFTTemplate from "../../contracts/NFTTemplate.cdc"
import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"

//TODO: Add roaylty
transaction(
            recipient: Address,
            quantity: UInt64,
            name: String, 
            description: String, 
            thumbnail: String, 
            metadata: {String: AnyStruct}
        ) {

            // storing the minter ref
            let minter: &NFTTemplate.NFTMinter;

            // Reference to the receiver's collection
            let recipientCollectionRef: &{NonFungibleToken.CollectionPublic}

            // total Supply before minting
            let oldTotalSupply: UInt64

            prepare(signer: AuthAccount) {

                self.oldTotalSupply = NFTTemplate.totalSupply;

                // borrow a reference to the NFTMinter resource in storage
                self.minter = signer.borrow<&NFTTemplate.NFTMinter>(
                    from: NFTTemplate.MinterStoragePath
                    ) ?? panic("Account does not store an object at the specified path")
                
                // Borrow the recipient's public NFT collection reference
                self.recipientCollectionRef = getAccount(recipient)
                    .getCapability(NFTTemplate.CollectionPublicPath)
                    .borrow<&{NonFungibleToken.CollectionPublic}>()
                    ?? panic("Could not get receiver reference to the NFT Collection")

            }

            execute {

                // Mint the NFT
                self.minter.batchMintNFT(
                    recipient: self.recipientCollectionRef, 
                    quantity: quantity,
                    name: name, 
                    description: description, 
                    thumbnail: thumbnail, 
                    royalties: [], 
                    metadata: metadata
                )
            }

            post {
                self.recipientCollectionRef.getIDs().contains(self.oldTotalSupply): "The next NFT ID should have been minted and delivered"
                NFTTemplate.totalSupply == self.oldTotalSupply + quantity:  "The total supply should have been increased by 1"
            }
}