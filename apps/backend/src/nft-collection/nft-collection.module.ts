import { Module } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import { NftCollectionController } from './nft-collection.controller';

@Module({
  providers: [NftCollectionService],
  controllers: [NftCollectionController]
})
export class NftCollectionModule {}
