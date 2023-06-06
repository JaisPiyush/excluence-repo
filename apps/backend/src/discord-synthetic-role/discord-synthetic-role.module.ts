import { Module } from '@nestjs/common';
import { DiscordSyntheticRoleController } from './discord-synthetic-role.controller';
import { DiscordSyntheticRoleService } from './discord-synthetic-role.service';

@Module({
  controllers: [DiscordSyntheticRoleController],
  providers: [DiscordSyntheticRoleService]
})
export class DiscordSyntheticRoleModule {}
