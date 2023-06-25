import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"

transaction(projectID: UInt32, componentID: UInt32, recipientAddress: Address) {

    let adminRef: &ExcluenceNFT.Admin

    prepare(acct: AuthAccount) {
        self.adminRef = acct.borrow<&ExcluenceNFT.Admin>(from: ExcluenceNFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the Admin resource")
    }

    execute {
        // get the public account object for the recipient
        let recep = getAccount(recipientAddress)

        // get the Collection reference for the receiver
        let recieverRef = recep.getCapability(ExcluenceNFT.CollectionPublicPath)
            .borrow<&{ExcluenceNFT.ExcluenceNFTCollectionPublic}>()!
        
        let projectRef = self.adminRef.borrowProject(projectID: projectID)

        // Mint a new NFT
        let nft <- projectRef.mintNFT(componentID: componentID)

        // deposit the NFT in the receivers collection
        recieverRef.deposit(token: <- nft)
    }
}