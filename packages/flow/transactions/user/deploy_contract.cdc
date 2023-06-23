
transaction(contractCode: String) {

    let acct: AuthAccount

    prepare(acct: AuthAccount) {
        
        self.acct = acct
        // Check to see if contract is already deployed
        if acct.contracts.get(name: "ExcluenceNFT") == nil {

            acct.contracts.add(
                name: "ExcluenceNFT", 
                code: contractCode.decodeHex()
            )

        }
    }

    post {
        self.acct.contracts.get(name: "ExcluenceNFT") != nil: "Failed to deploy contract"
    }
}