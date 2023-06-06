import { Module } from '@nestjs/common';
import { NftStudioService } from './nft-studio.service';
import { NftStudioController } from './nft-studio.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { NFTStudio, NFTStudioSchema } from './schema/nft-studio.schema';
import { NFTStudioGuild } from './schema/nft-studio-guild.schema';
import {
    NFTStudioPublicKey,
    NFTStudioPublicKeySchema,
} from './schema/nft-studio-public-key.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: NFTStudio.name, schema: NFTStudioSchema },
            { name: NFTStudioGuild.name, schema: NFTStudioSchema },
            { name: NFTStudioPublicKey.name, schema: NFTStudioPublicKeySchema },
        ]),
    ],
    providers: [NftStudioService],
    controllers: [NftStudioController],
})
export class NftStudioModule {}
