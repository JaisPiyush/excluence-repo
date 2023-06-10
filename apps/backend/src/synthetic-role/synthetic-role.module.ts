import { Module } from '@nestjs/common';
import { SyntheticRoleService } from './synthetic-role.service';
import { SyntheticRoleController } from './synthetic-role.controller';

@Module({
  providers: [SyntheticRoleService],
  controllers: [SyntheticRoleController]
})
export class SyntheticRoleModule {}
