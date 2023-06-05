import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserIdAddressDto } from 'src/discord-membership/dto/userId/index.dto';
import { UserIdAddress } from 'src/discord-membership/schemas/userId/userId-address.schema';

@Injectable()
export class UserIdService {
    constructor(
        @InjectModel(UserIdAddress.name)
        private userIdAddressModel: Model<UserIdAddress>,
    ) {}

    async create(
        createUserIdAddressDto: UserIdAddressDto,
    ): Promise<UserIdAddress> {
        const userIdAddress = new this.userIdAddressModel(
            createUserIdAddressDto,
        );
        return await userIdAddress.save();
    }

    async findAllPublicKey(userId: string): Promise<string[]> {
        const userIdAddressArray = await this.userIdAddressModel
            .find({
                userId: userId,
            })
            .exec();
        return userIdAddressArray.map(
            (userIdAddress) => userIdAddress.publicKey,
        );
    }

    async findUserIdByPublicKey(publicKey: string): Promise<string | null> {
        const userIdAddress = await this.userIdAddressModel
            .findOne({ publicKey: publicKey })
            .exec();
        if (userIdAddress !== null) return userIdAddress.userId;
        return null;
    }

    async deleteUserIdAddress(
        userIdAddressDto: UserIdAddressDto,
    ): Promise<void> {
        await this.userIdAddressModel
            .findOneAndDelete()
            .and([
                { userId: userIdAddressDto.userId },
                { publicKey: userIdAddressDto.publicKey },
            ])
            .exec();
    }
}
