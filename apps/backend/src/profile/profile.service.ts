import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Profile } from './schema/profile.schema';
import { Model } from 'mongoose';
import { validateDiscordUserAccessToken } from '@excluence-repo/discord-connector';
import { ProfileGuild } from './schema/profile-guilds.schema';

@Injectable()
export class ProfileService {
  constructor(
    @InjectModel(Profile.name)
    private readonly profileModel: Model<Profile>,
    @InjectModel(ProfileGuild.name)
    private readonly profileGuildModel: Model<ProfileGuild>,
  ) {}

  async findGuildsByPublicKey(publicKey: string): Promise<ProfileGuild[]> {
    return await this.profileGuildModel.find({ publicKey }).exec();
  }

  async findByDiscordUserId(discordUserId: string): Promise<Profile | null> {
    return await this.profileModel.findOne({ discordUserId }).exec();
  }

  async filterGuildsForPublicKey(
    publicKey: string,
    guilds: string[],
  ): Promise<string[]> {
    return (
      await this.profileGuildModel
        .find({
          $and: [
            { publicKey: { $eq: publicKey } },
            { guildId: { $in: guilds } },
          ],
        })
        .select('guildId')
        .exec()
    ).map((profileGuild) => profileGuild.guildId);
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

  async addGuild(publicKey: string, guildId: string) {
    const profileGuild = new this.profileGuildModel({ guildId, publicKey });
    return await profileGuild.save();
  }
}
