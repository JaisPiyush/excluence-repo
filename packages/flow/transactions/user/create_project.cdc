import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"
import FungibleToken from "../../contracts/interfaces/FungibleToken.interface.cdc"

transaction(
    name: String,
    args: {String: AnyStruct},
    royaltyRecvs: [Address],
    royaltyCuts: {Address: UFix64},
    roayltDescriptions: {Address: String}
) {

    let adminRef: &ExcluenceNFT.Admin
    let currNextProjectID: UInt32

    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&ExcluenceNFT.Admin>(from: ExcluenceNFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currNextProjectID = ExcluenceNFT.nextProjectID
    }

    pre {
        args["squareImage"] != nil: "Cannot create Project: Project Square image is required"
    }

    execute {
        let description = args["description"] == nil? "": args["description"] as! String
        let externalURL = MetadataViews.ExternalURL(args["externaURL"] == nil ? ""
            : args["externalURL"] as! String)
        
        var squareImageMap = args["squareImage"] as! {String: String}
        let squareImage = ExcluenceNFT.dictToMedia(squareImageMap)

        let emptyMediaMap = {
            "fileType": "https",
            "url": "",
            "mediaType": "image/*"
        }

        let bannerImage = ExcluenceNFT.dictToMedia(
            args["bannerImage"] == nil ? emptyMediaMap: args["bannerImage"] as! {String: String}
        )

        let socials: {String: MetadataViews.ExternalURL} = {}
        let socialsMap:{String: String} = args["socials"] == nil ? {}: args["social"] as! {String:String}

        for social in socialsMap.keys {
            socials[social] = MetadataViews.ExternalURL(socialsMap[social]!)
        }


        self.adminRef.createProject(name: name, 
            description: description, 
            externalURL: externalURL, 
            squareImage: squareImage, 
            bannerImage: bannerImage, 
            socials: socials, 
            royalties: []
        )
    }

    post {
        ExcluenceNFT.getQueryProjectData(projectID: self.currNextProjectID).name == name:
            "Failed to create the new project"
    }
}
