import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordMembershipModule } from './discord-membership/discord-membership.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordMembershipModule,
        MongooseModule.forRoot('mongodb://localhost:27017'),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
