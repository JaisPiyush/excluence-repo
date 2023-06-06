import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NFTStudio } from './schema/nft-studio.schema';
import { Model } from 'mongoose';

@Injectable()
export class NftStudioService {
    constructor(
        @InjectModel(NFTStudio.name)
        private readonly nftStudioModel: Model<NFTStudio>,
    ) {}
}
