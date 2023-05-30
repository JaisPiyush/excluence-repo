import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordMembershipModule } from './discord-membership/discord-membership.module';

@Module({
  imports: [DiscordMembershipModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
