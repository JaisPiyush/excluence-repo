import { Module } from '@nestjs/common';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NFT, NFTSchema } from './schema/nft.schema';

@Module({
    controllers: [NftController],
    providers: [NftService],
    imports: [
        MongooseModule.forFeature([{ name: NFT.name, schema: NFTSchema }]),
    ],
})
export class NftModule {}
