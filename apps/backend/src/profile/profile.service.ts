import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schema/profile.schema';
import { Model } from 'mongoose';
import { validateDiscordUserAccessToken } from '@excluence-repo/discord-connector';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
  ) {}

  async findByPublicKey(publicKey: string): Promise<Profile | null> {
    return await this.profileModel.findOne({ publicKey }).exec();
  }

  async findByDiscordUserId(discordUserId: string): Promise<Profile | null> {
    return await this.profileModel.findOne({ discordUserId }).exec();
  }

  async createProfile(
    publicKey: string,
    accessToken: string,
  ): Promise<Profile> {
    const discordId = await validateDiscordUserAccessToken(accessToken);
    if (discordId === null) {
      throw new HttpException(
        'Discord verification failed due to invalid access token',
        HttpStatus.BAD_REQUEST,
      );
    }
    const profile = new this.profileModel({
      publicKey,
      discordUserId: discordId,
    });
    return await profile.save();
  }
}
