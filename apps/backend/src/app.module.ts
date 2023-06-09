import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { NftStudioModule } from './nft-studio/nft-studio.module';
import { DiscordSyntheticRoleModule } from './discord-synthetic-role/discord-synthetic-role.module';
import { ProfileModule } from './profile/profile.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard, RoleGuard } from './auth/auth.guard';

@Module({
    imports: [
        MongooseModule.forRoot(process.env['MONGO_URL'] as string),
        NftCollectionModule,
        NftStudioModule,
        DiscordSyntheticRoleModule,
        ProfileModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [
        AppService,
        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard,
        },
        {
            provide: APP_GUARD,
            useClass: RoleGuard,
        },
    ],
})
export class AppModule {}
