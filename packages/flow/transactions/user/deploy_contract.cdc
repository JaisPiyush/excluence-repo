import FungibleToken from "../../contracts/interfaces/FungibleToken.interface.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"

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


pub fun dictToRoyalty(addr: Address, cut: UFix64, description: String? ): MetadataViews.Royalty {
    let benfCap = getAccount(addr)
            .getCapability<&{FungibleToken.Receiver}>(MetadataViews.getRoyaltyReceiverPublicPath())
    return MetadataViews.Royalty(
        reciever: benfCap,
        cut: cut,
        description: description ?? ""
    )
}
transaction(
        name: String, 
        contractCode: String,
        collectionName: String,
        description: String,
        externalURL: String,
        squareImage: {String: String},
        bannerImage: {String: String},
        socials: {String: String},
        royaltyCuts: {Address: UFix64},
        royaltyDescriptions: {Address: String}
    ) {


    prepare(acct: AuthAccount) {

        // Check to see if contract is already deployed
        if acct.contracts.get(name: name) == nil {

            let squareImageMedia = dictToMedia(squareImage)
            let bannerImageMedia = dictToMedia(bannerImage)
            
            let socialsRecord: {String: MetadataViews.ExternalURL} = {}
            for social in socials.keys {
                socialsRecord[social] = MetadataViews.ExternalURL(socials[social]!)
            }

            let royalties: [MetadataViews.Royalty] = []
            for addr in royaltyCuts.keys {
                royalties.append(
                    dictToRoyalty(addr: addr, cut: royaltyCuts[addr]!, 
                    description: royaltyDescriptions[addr]
                    )
                )
            }

            let externalURLStruct = MetadataViews.ExternalURL(externalURL)

            acct.contracts.add(
                name: name, 
                code: contractCode.decodeHex(),
                collectionName,
                description,
                externalURLStruct,
                squareImageMedia,
                bannerImageMedia,
                socialsRecord,
                royalties
            )
        }
    }

}