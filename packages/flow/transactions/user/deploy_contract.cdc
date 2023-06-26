
transaction(name: String, contractCode: String) {


    prepare(acct: AuthAccount) {

        // Check to see if contract is already deployed
        if acct.contracts.get(name: name) == nil {

            acct.contracts.add(
                name: name, 
                code: contractCode.decodeHex()
            )
        }
    }

}