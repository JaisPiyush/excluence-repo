import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"
import NFTTemplate from "../../contracts/NFTTemplate.cdc"



transaction {
    prepare(acct: AuthAccount) {

        // Check to see if collection already exists
        if acct.borrow<&NFTTemplate.Collection>(from: NFTTemplate.CollectionStoragePath) == nil {

            // Create a new NFTTemplate collection
            let collection <- NFTTemplate.createEmptyCollection()

            // Put the new Collection in storage
            acct.save(<- collection, to: NFTTemplate.CollectionStoragePath)

            // create a public capability for the collection
            acct.link<&{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, NFTTemplate.NFTTemplateCollectionPublic, 
                MetadataViews.ResolverCollection}>(NFTTemplate.CollectionPublicPath, target: NFTTemplate.CollectionStoragePath)
        }
    }
}