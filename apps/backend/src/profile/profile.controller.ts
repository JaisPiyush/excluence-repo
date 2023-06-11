import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { Profile } from './schema/profile.schema';
import { ProfileService } from './profile.service';
import { ControllerResult } from 'src/types';
import { ProfileGuild } from './schema/profile-guilds.schema';
import { ProfileGuildWithMetadata } from './dto';
import { getGuild } from '@excluence-repo/discord-connector';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('@me')
  async getMyGuilds(
    @Req() req: any,
  ): Promise<ControllerResult<ProfileGuildWithMetadata[]>> {
    const user = req.user as Partial<Profile>;
    const profiles = await this.profileService.findGuildsByPublicKey(
      user.publicKey,
    );
    const profilesWithGuildInfo = await Promise.all(
      profiles.map<Promise<ProfileGuildWithMetadata>>(async (profile) => {
        const guildInfo = await getGuild({ id: profile.guildId });
        return {
          guildId: profile.guildId,
          publicKey: profile.publicKey,
          icon: guildInfo.icon,
          name: guildInfo.name,
        };
      }),
    );
    return {
      result: profilesWithGuildInfo,
    };
  }

  @Post('guild')
  async addGuild(@Req() request: any, @Body('guildId') guildId: string) {
    if (guildId === undefined)
      throw new HttpException('invalid guildId', HttpStatus.BAD_REQUEST);
    const user = request.user;
    return {
      result: await this.profileService.addGuild(user.publicKey, guildId),
    };
  }
}
