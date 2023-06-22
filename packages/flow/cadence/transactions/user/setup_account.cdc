import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"
import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"


transaction {
    prepare(acct: AuthAccount) {

        // Check to see if collection already exists
        if acct.borrow<&ExcluenceNFT.Collection>(from: ExcluenceNFT.CollectionStoragePath) == nil {

            // Create a new ExcluenceNFT collection
            let collection <- ExcluenceNFT.createEmptyCollection()

            // Put the new Collection in storage
            acct.save(<- collection, to: ExcluenceNFT.CollectionStoragePath)

            // create a public capability for the collection
            acct.link<&{NonFungibleToken.Receiver, NonFungibleToken.CollectionPublic, ExcluenceNFT.ExcluenceNFTCollectionPublic, 
                MetadataViews.ResolverCollection}>(ExcluenceNFT.CollectionPublicPath, target: ExcluenceNFT.CollectionStoragePath)
        }
    }
}