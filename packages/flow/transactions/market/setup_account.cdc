import NFTStorefrontV2 from "../../contracts/NFTStorefrontV2.cdc"

transaction {
    prepare(acct: AuthAccount) {

        if acct.borrow<&NFTStorefrontV2.Storefront>(from: NFTStorefrontV2.StorefrontStoragePath) == nil {

            // Create a new empty storefront
            let storefront <- NFTStorefrontV2.createStorefront() as! @NFTStorefrontV2.Storefront 

            // save it to the account
            acct.save(<-storefront, to: NFTStorefrontV2.StorefrontStoragePath)

            // create a public capability for the Storefront
            acct.link<&NFTStorefrontV2.Storefront{NFTStorefrontV2.StorefrontPublic}>(
                NFTStorefrontV2.StorefrontPublicPath, 
                target: NFTStorefrontV2.StorefrontStoragePath
            )
        }
    }
}