import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { NftStudioModule } from './nft-studio/nft-studio.module';
import { DiscordSyntheticRoleModule } from './discord-synthetic-role/discord-synthetic-role.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env['MONGO_URL'] as string),
        NftCollectionModule,
        NftStudioModule,
        DiscordSyntheticRoleModule,
        ProfileModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
