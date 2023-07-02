import { Module } from '@nestjs/common';
import { NftCollectionController } from './nft-collection.controller';
import { NftCollectionService } from './nft-collection.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    NFTCollection,
    NFTCollectionSchema,
} from './schema/nftCollection.schema';

@Module({
    controllers: [NftCollectionController],
    imports: [
        MongooseModule.forFeature([
            { name: NFTCollection.name, schema: NFTCollectionSchema },
        ]),
    ],
    providers: [NftCollectionService],
    exports: [NftCollectionService],
})
export class NftCollectionModule {}
