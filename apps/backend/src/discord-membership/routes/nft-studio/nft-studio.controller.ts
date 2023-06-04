import { Controller, Get, Param, Post } from '@nestjs/common';
import { NftStudioService } from './nft-studio.service';
import {
    NFTStudioDto,
    NFTStudioGuildDto,
} from 'src/discord-membership/dto/nft-studio/index.dto';
import { NFTStudio } from 'src/discord-membership/schemas/nft-studio/nft-studio.schema';

@Controller('nft-studio')
export class NftStudioController {
    constructor(private nftStudioService: NftStudioService) {}

    @Post()
    async create(nftStudioDto: NFTStudioDto): Promise<NFTStudio> {
        return await this.nftStudioService.createNFTStudio(nftStudioDto);
    }

    @Get(':guildId')
    async fetch(
        @Param('guildId') guildId: string,
    ): Promise<NFTStudioGuildDto | null> {
        return await this.nftStudioService.findNFTStudioGuildByGuildId(guildId);
    }
}
