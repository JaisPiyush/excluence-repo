import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NFTCollection } from './schema/nftCollection.schema';
import { Model } from 'mongoose';
import { CreateNFTCollectionDataDto } from './dto/create_collection.dto';

@Injectable()
export class NftCollectionService {
    constructor(
        @InjectModel(NFTCollection.name)
        private readonly nftCollectionModel: Model<NFTCollection>,
    ) {}

    async isExternalURLAvailable(externalURL: string) {
        const nftCollection = await this.nftCollectionModel.findOne({
            externalURL,
        });
        return nftCollection === null;
    }

    async getAllCollectionsByAddress(address: string) {
        return await this.nftCollectionModel.find({ address });
    }

    async createNFTCollection(data: CreateNFTCollectionDataDto) {
        const nftCollection = new this.nftCollectionModel(data);
        return await nftCollection.save();
    }
}
