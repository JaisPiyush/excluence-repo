import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NFTCollection } from './schema/nft-collection.schema';
import { Model } from 'mongoose';
import { NFTCollectionGuild } from './schema/nft-collection-guild.schema';

@Injectable()
export class NftCollectionService {
  constructor(
    @InjectModel(NFTCollection.name)
    private readonly nftCollectionModel: Model<NFTCollection>,
    @InjectModel(NFTCollectionGuild.name)
    private readonly nftCollectionGuildModel: Model<NFTCollectionGuild>,
  ) {}

  async createNFTCollections(
    contractAddressArray: string[],
    creatorPublicKey: string,
  ): Promise<NFTCollection[]> {
    // TODO: Add creator-ship verification for each contract address;
    return await this.nftCollectionModel.insertMany(
      contractAddressArray.map((address) => {
        return new this.nftCollectionModel({ address, creatorPublicKey });
      }),
    );
  }

  async findAllNFTCollections(publicKey: string): Promise<NFTCollection[]> {
    return await this.nftCollectionModel
      .find({ creatorPublicKey: publicKey })
      .exec();
  }
}
