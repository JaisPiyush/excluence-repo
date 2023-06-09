import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { NFTStudio } from './schema/nft-studio.schema';
import { Model } from 'mongoose';
import { AuthUser } from 'src/auth/schema/auth-user.schema';

@Injectable()
export class NftStudioService {
    constructor(
        @InjectModel(NFTStudio.name)
        private readonly nftStudioModel: Model<NFTStudio>,
    ) {}

    async create(authUser: AuthUser, name: string): Promise<NFTStudio> {
        try {
            const studio = new this.nftStudioModel({
                name,
                owner: authUser,
            });
            return await studio.save();
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
        }
    }

    async getNftStudio(user: AuthUser): Promise<NFTStudio | null> {
        return await this.nftStudioModel
            .findOne({
                owner: user,
            })
            .exec();
    }
}
