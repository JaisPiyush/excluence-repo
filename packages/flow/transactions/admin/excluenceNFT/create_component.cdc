import ExcluenceNFT from "../../contracts/ExcluenceNFT.cdc"
import MetadataViews from "../../contracts/interfaces/MetadataViews.interface.cdc"

transaction(
    name: String,
    thumbnail: {String: String},
    traitString: {String: String},
    traitsNumber: {String: UInt32},
    traitsBool: {String: Bool},
    traitsUFix64: {String: UFix64},
    description: String?,
    medias: [{String: String}],
    royaltyCuts: {Address: UFix64},
    royaltyDescriptions: {Address: String}
) {

    let adminRef: &ExcluenceNFT.Admin
    let currNextComponentID: UInt32

    prepare(acct: AuthAccount) {

        self.adminRef = acct.borrow<&ExcluenceNFT.Admin>(from: ExcluenceNFT.AdminStoragePath)
            ?? panic("Could not borrow a reference to the Admin resource")
        self.currNextComponentID = ExcluenceNFT.nextComponentID
    }

    execute {

        let thumbnailFile = ExcluenceNFT.dictToMedia(thumbnail).file
        let mediasFileArray: [AnyStruct{MetadataViews.File}] = []

        for media in medias {
            let mediaFile = ExcluenceNFT.dictToMedia(media).file
            mediasFileArray.append(mediaFile)

        }

        let excludeNames = [
            "name",
            "thumbnail",
            "description",
            "medias",
            "royalties"
        ]

        let _traits = MetadataViews.dictToTraits(dict: traitString, excludedNames: excludeNames).traits

        _traits.appendAll(MetadataViews.dictToTraits(dict: traitsNumber, excludedNames: excludeNames).traits)
        _traits.appendAll(MetadataViews.dictToTraits(dict: traitsBool, excludedNames: excludeNames).traits)
        _traits.appendAll(MetadataViews.dictToTraits(dict: traitsUFix64, excludedNames: excludeNames).traits)

        let royalties = ExcluenceNFT.createRoyaltyStructs(
            royaltyCuts: royaltyCuts, 
            royaltyDescriptions: royaltyDescriptions
        )

        //TODO: Add Royalties
        self.adminRef.createComponent(
            name: name, 
            description: description, 
            thumbnail: thumbnailFile, 
            medias: mediasFileArray, 
            traits: MetadataViews.Traits(_traits), 
            royalties: royalties
        )
    }

    post {
        ExcluenceNFT.getComponent(componentID: self.currNextComponentID)!.name == name:
        "Failed to create the new component"
    }
     
}
