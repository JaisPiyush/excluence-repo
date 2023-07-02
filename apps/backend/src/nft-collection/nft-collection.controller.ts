import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import { ResponseType } from 'src/shared/types';
import { NFTCollection } from './schema/nftCollection.schema';
import { FlowSignatureGuard } from 'src/shared/guards/flow_signature.guard';
import { CreateNFTCollectionDto } from './dto/create_collection.dto';

@Controller('nft-collection')
export class NftCollectionController {
    constructor(private readonly nftCollectionService: NftCollectionService) {}

    @Get('isExternalURLAvailable')
    async isExternalURLAvailable(
        @Query('url') url: string,
    ): ResponseType<boolean> {
        return {
            data: await this.nftCollectionService.isExternalURLAvailable(url),
        };
    }

    @Get(':address')
    async getAllCollectionsByAddress(
        @Param('address') address: string,
    ): ResponseType<NFTCollection[]> {
        return {
            data: await this.nftCollectionService.getAllCollectionsByAddress(
                address,
            ),
        };
    }

    @Post()
    @UseGuards(FlowSignatureGuard)
    async create(
        @Body() body: CreateNFTCollectionDto,
    ): ResponseType<NFTCollection> {
        const nftCollection =
            await this.nftCollectionService.createNFTCollection(
                body.packet.data,
            );
        return {
            data: nftCollection,
        };
    }
}
