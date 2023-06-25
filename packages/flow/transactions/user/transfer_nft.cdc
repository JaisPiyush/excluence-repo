import NonFungibleToken from "../../contracts/interfaces/NonFungibleToken.interface.cdc"
import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

transaction(recp: Address, nftID: UInt64) {

    let transferToken: @NonFungibleToken.NFT

    prepare(acct: AuthAccount) {

        let collectionRef = acct.borrow<&ExcluenceNFT.Collection>(from: ExcluenceNFT.CollectionStoragePath)
            ?? panic("Could not borrow a reference to the stored NFT collection")
        
        // Withdraw the NFT
        self.transferToken <- collectionRef.withdraw(withdrawID: nftID)

    }

    execute {
        let recpient = getAccount(recp)
        let receiverRef = recpient.getCapability(ExcluenceNFT.CollectionPublicPath)
            .borrow<&{ExcluenceNFT.ExcluenceNFTCollectionPublic}>()!
        
        // deposit the NFT in the receivers collection
        receiverRef.deposit(token: <- self.transferToken)
    }
}