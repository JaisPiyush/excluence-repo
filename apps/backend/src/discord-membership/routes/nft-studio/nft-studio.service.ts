import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NFTStudioGuild } from 'src/discord-membership/schemas/nft-studio/nft-studio-guild.schema';
import { NFTStudioPublicKey } from 'src/discord-membership/schemas/nft-studio/nft-studio-public-key.schema';
import { NFTStudio } from 'src/discord-membership/schemas/nft-studio/nft-studio.schema';

@Injectable()
export class NftStudioService {
    constructor(
        @InjectModel(NFTStudio.name) private nftStudioModel: Model<NFTStudio>,
        @InjectModel(NFTStudioPublicKey.name) 
            private nftStudioPublicModel: Model<NFTStudioPublicKey>,
        @InjectModel(NFTStudioGuild.name)
            private nftStudioGuildModel: Model<NFTStudioGuild>
    ){}
}
