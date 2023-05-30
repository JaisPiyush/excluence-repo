import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordMembershipModule } from './discord-membership/discord-membership.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [DiscordMembershipModule,
    MongooseModule.forRoot(
      process.env['MONGO_ATLAS_URL'] as string
    )
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
