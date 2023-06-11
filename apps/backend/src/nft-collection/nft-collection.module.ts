import { Module } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import { NftCollectionController } from './nft-collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  NFTCollection,
  NFTCollectionSchema,
} from './schema/nft-collection.schema';
import {
  NFTCollectionGuild,
  NFTCollectionGuildSchema,
} from './schema/nft-collection-guild.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: NFTCollection.name, schema: NFTCollectionSchema },
      { name: NFTCollectionGuild.name, schema: NFTCollectionGuildSchema },
    ]),
  ],
  providers: [NftCollectionService],
  controllers: [NftCollectionController],
  exports: [NftCollectionService],
})
export class NftCollectionModule {}
