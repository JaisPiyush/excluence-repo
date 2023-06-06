import { Module } from '@nestjs/common';
import { NftStudioService } from './nft-studio.service';
import { NftStudioController } from './nft-studio.controller';

@Module({
  providers: [NftStudioService],
  controllers: [NftStudioController]
})
export class NftStudioModule {}
