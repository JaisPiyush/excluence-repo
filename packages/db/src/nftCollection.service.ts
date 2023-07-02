import { INFTCollection, NFTCollectionModel } from "./schema/nftCollection.schema"

export default class NFTCollectionService {

    async isExternalURLAvailable(externalURL: string): Promise<boolean> {
        const nfCollection = await NFTCollectionModel.findOne({externalURL}).exec()
        return nfCollection === null
    }

    async createNFTCollection(data: {externalURL: string, address: string, contractName: string}) {
        const nftCollection = new NFTCollectionModel(data)
        return await nftCollection.save()
    }

    async getAllCollection(address: string) {
        return await NFTCollectionModel.find({address}).exec()
    }
}