import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NFT } from './schema/nft.schema';
import { Model } from 'mongoose';

@Injectable()
export class NftService {
    constructor(
        @InjectModel(NFT.name)
        private readonly nftModel: Model<NFT>,
    ) {}
}
