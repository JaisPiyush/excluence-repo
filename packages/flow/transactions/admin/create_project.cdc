import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"
import FungibleToken from "../../contracts/interfaces/FungibleToken.interface.cdc"

transaction(
    name: String,
    description: String,
    squareImage: {String: String},
    externalURL: String?,
    bannerImage: {String: String}?,
    socials: {String: String},
    royaltyCuts: {Address: UFix64},
    royaltyDescriptions: {Address: String}
) {

    let adminRef: &ExcluenceNFT.Admin
    let currNextProjectID: UInt32

    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&ExcluenceNFT.Admin>(from: ExcluenceNFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currNextProjectID = ExcluenceNFT.nextProjectID
    }

    execute {
        let externalURL = MetadataViews.ExternalURL(externalURL ?? "")


        let emptyMediaMap = {
            "fileType": "https",
            "url": "",
            "mediaType": "image/*"
        }

        let bannerImage = ExcluenceNFT.dictToMedia(
            bannerImage == nil ? emptyMediaMap: bannerImage!
        )

        let _socials: {String: MetadataViews.ExternalURL} = {}

        for social in socials.keys {
            _socials[social] = MetadataViews.ExternalURL(socials[social]!)
        }

        let royalties = ExcluenceNFT.createRoyaltyStructs(
            royaltyCuts: royaltyCuts, 
            royaltyDescriptions: royaltyDescriptions
        )

        self.adminRef.createProject(name: name, 
            description: description, 
            externalURL: externalURL, 
            squareImage: ExcluenceNFT.dictToMedia(squareImage), 
            bannerImage: bannerImage, 
            socials: _socials, 
            royalties: royalties
        )

    }

    post {
        ExcluenceNFT.getQueryProjectData(projectID: self.currNextProjectID).name == name:
            "Failed to create the new project"
    }
}
