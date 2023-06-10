import { Controller, Get, Req } from '@nestjs/common';
import { ControllerResult } from 'src/types';
import { SyntheticRole } from './schema/synthetic-role.schema';
import { SyntheticRoleService } from './synthetic-role.service';
import { Profile } from 'src/profile/schema/profile.schema';

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
}
