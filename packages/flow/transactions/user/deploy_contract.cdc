
transaction(contractCode: String) {


    prepare(acct: AuthAccount) {

        // Check to see if contract is already deployed
        if acct.contracts.get(name: "ExcluenceNFT") == nil {

            acct.contracts.add(
                name: "ExcluenceNFT", 
                code: contractCode.decodeHex()
            )
        }
    }

}