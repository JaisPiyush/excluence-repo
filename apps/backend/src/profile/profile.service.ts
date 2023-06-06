import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ProfileUserAddress } from './schema/profile-user-address.schema';
import { Model } from 'mongoose';
import { AddProfileUserAddressDto } from './dto/index.dto';
import { ProfileUserAddressAlreadyExists } from './profile.error';

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(ProfileUserAddress.name)
        private readonly profileUserAddressModel: Model<ProfileUserAddress>,
    ) {}

    async addProfileAddress(
        addProfileUserAddress: AddProfileUserAddressDto,
    ): Promise<ProfileUserAddress> {
        const profileUserAddressQuerySet = await this.profileUserAddressModel
            .find({
                publicKey: addProfileUserAddress.publicKey,
            })
            .exec();
        if (profileUserAddressQuerySet.length !== 0) {
            throw new ProfileUserAddressAlreadyExists();
        }
        const profileUserAddress = new this.profileUserAddressModel(
            addProfileUserAddress,
        );
        return await profileUserAddress.save();
    }

    async findByPublicKey(publicKey: string): Promise<ProfileUserAddress[]> {
        return await this.profileUserAddressModel
            .find({ publicKey: publicKey })
            .select('discordUserId _id createdAt updatedAt')
            .exec();
    }

    async findByDiscordUserId(
        discordUserId: string,
    ): Promise<ProfileUserAddress[]> {
        return await this.profileUserAddressModel
            .find({ discordUserId: discordUserId })
            .select('publicKey')
            .exec();
    }
}
