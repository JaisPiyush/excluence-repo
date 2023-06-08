import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NFTStudio } from './schema/nft-studio.schema';
import { Model } from 'mongoose';
import { CreateNFTStudioDto } from './dto/index.dto';

@Injectable()
export class NftStudioService {
    constructor(
        @InjectModel(NFTStudio.name)
        private readonly nftStudioModel: Model<NFTStudio>,
    ) {}
    // TODO: This function requires superuser to run
    // After proper the implementation of authentications
    // NFT Studio will also require the implementation of password for login
    async create(createNFTStudioDto: CreateNFTStudioDto): Promise<NFTStudio> {
        const nftStudio = new this.nftStudioModel(createNFTStudioDto);
        return await nftStudio.save();
    }

    async find(studioId: string): Promise<NFTStudio[]> {
        return await this.nftStudioModel.find({ studioId }).exec();
    }
}
