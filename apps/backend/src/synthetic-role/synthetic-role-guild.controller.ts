import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
} from '@nestjs/common';
import { SyntheticRoleService } from './synthetic-role.service';
import { Profile } from 'src/profile/schema/profile.schema';

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

  @Get('role/:id')
  async findAllGuildRoles(@Param('id') id: string) {
    //TODO: Improve all queries to only show user owned data
    return {
      result: await this.syntheticRoleService.findAllGuildRoleBySyntheticRoleId(
        id,
      ),
    };
  }

  @Get(':id')
  async findAllGuildRolesByGuildId(@Param('id') id: string) {
    return {
      result: await this.syntheticRoleService.findAllGuildRoleByGuildId(id),
    };
  }

  @Get('collection/:address')
  async findAllGuildRolesByCollectionAddress(
    @Param('address') address: string,
  ) {
    return {
      result:
        await this.syntheticRoleService.findAllGuildRolesByCollectionAddress(
          address,
        ),
    };
  }
}
