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

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get('@me')
  async getMyGuilds(
    @Req() req: any,
  ): Promise<ControllerResult<ProfileGuild[]>> {
    const profile = req.user as Partial<Profile>;
    return {
      result: await this.profileService.findGuildsByPublicKey(
        profile.publicKey,
      ),
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
