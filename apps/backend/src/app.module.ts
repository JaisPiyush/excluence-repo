import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DiscordMembershipModule } from './discord-membership/discord-membership.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { NftStudioModule } from './nft-studio/nft-studio.module';
import { DiscordSyntheticRoleModule } from './discord-synthetic-role/discord-synthetic-role.module';
import { UserModule } from './user/user.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        DiscordMembershipModule,
        MongooseModule.forRoot('mongodb://localhost:27017'),
        NftCollectionModule,
        NftStudioModule,
        DiscordSyntheticRoleModule,
        UserModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
