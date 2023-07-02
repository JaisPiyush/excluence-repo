import { Controller, Get, Query } from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';

@Controller('nft-collection')
export class NftCollectionController {
    constructor(private readonly nftCollectionService: NftCollectionService) {}

    @Get('isExternalURLAvailable')
    async isExternalURLAvailable(@Query('url') url: string): Promise<boolean> {
        return await this.nftCollectionService.isExternalURLAvailable(url);
    }
}
