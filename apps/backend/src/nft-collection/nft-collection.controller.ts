import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { NftCollectionService } from './nft-collection.service';
import { NFTCollection } from './schema/nft-collection.schema';
import { ControllerResult } from 'src/types';
import { Profile } from 'src/profile/schema/profile.schema';

@Controller('nft-collection')
export class NftCollectionController {
  constructor(private readonly nftCollectionService: NftCollectionService) {}

  @Post()
  async importNFTCollections(
    @Req() request: any,
    @Body('contracts') contracts: string[],
  ): Promise<ControllerResult<NFTCollection[]>> {
    try {
      contracts = contracts.filter((address) => address.length > 0);
      if (contracts.length === 0) throw new Error();
      const user = request.user as Partial<Profile>;
      return {
        result: await this.nftCollectionService.createNFTCollections(
          contracts,
          user.publicKey,
        ),
      };
    } catch (e) {
      throw new HttpException(
        'invalid or empty contract address array',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Get()
  async getAllMyNFTCollections(
    @Req() request: any,
  ): Promise<ControllerResult<NFTCollection[]>> {
    const user = request.user as Partial<Profile>;
    return {
      result: await this.nftCollectionService.findAllNFTCollections(
        user.publicKey,
      ),
    };
  }
}
