import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SyntheticRoleService } from './synthetic-role.service';

@Controller('synthetic-role/guild')
export class SyntheticRoleGuildController {
  constructor(private readonly syntheticRoleService: SyntheticRoleService) {}
  @Post(':id')
  async addSyntheticRoleToGuilds(
    @Req() req: any,
    @Param('id') syntheticRoleId: string,
    @Body('guildIds') guilds: string[],
  ) {
    const user = req.user as { publicKey: string };
    if (!syntheticRoleId || !guilds || guilds.length === 0)
      throw new HttpException(
        'invalid synthetic role id or guildIds',
        HttpStatus.BAD_REQUEST,
      );
    const syntheticRole =
      await this.syntheticRoleService.findSyntheticRoleUsingId(syntheticRoleId);
    if (syntheticRole === null)
      throw new HttpException('no synthetic role found', HttpStatus.NOT_FOUND);
    return await this.syntheticRoleService._addRolesToGuilds(
      user,
      syntheticRole,
      guilds,
    );
  }
}
