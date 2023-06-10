import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { ControllerResult } from 'src/types';
import { SyntheticRole } from './schema/synthetic-role.schema';
import { SyntheticRoleService } from './synthetic-role.service';
import { Profile } from 'src/profile/schema/profile.schema';
import { CreateSyntheticRoleDto } from './dto/index.dto';

@Controller('synthetic-role')
export class SyntheticRoleController {
  constructor(private readonly syntheticRoleService: SyntheticRoleService) {}
  @Get()
  async findMySyntheticRoles(
    @Req() request: any,
  ): Promise<ControllerResult<SyntheticRole[]>> {
    const user = request.user as Partial<Profile>;
    return {
      result: await this.syntheticRoleService.findAllRolesByCreator(
        user.publicKey,
      ),
    };
  }

  @Post()
  async createSyntheticRole(
    @Req() req: any,
    @Body('role') role: CreateSyntheticRoleDto,
    @Body('guildIds') guilds?: string[],
    @Body('collections') collections?: string[],
  ) {
    const user = req.user as { publicKey: string };
    const syntheticRole = await this.syntheticRoleService.createSyntheticRole(
      user.publicKey,
      role,
    );
    await this.syntheticRoleService._addRolesToGuilds(
      user,
      syntheticRole,
      guilds,
    );
    await this.syntheticRoleService._addRolesToCollections(
      user,
      syntheticRole,
      collections,
    );
    return {
      result: syntheticRole,
    };
  }

  @Get()
  async getAllMySyntheticRoles(@Req() req: any) {
    return {
      result: await this.syntheticRoleService.findAllRolesByCreator(
        req.user.publicKey,
      ),
    };
  }

  @Get(':id')
  async getSyntheticRoleUsingId(@Param('id') id: string) {
    return {
      result: await this.syntheticRoleService.findSyntheticRoleUsingId(id),
    };
  }
}
