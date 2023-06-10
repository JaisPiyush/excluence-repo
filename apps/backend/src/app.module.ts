import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfileModule } from './profile/profile.module';
import { MongooseModule } from '@nestjs/mongoose';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/auth.guard';
import { AuthModule } from './auth/auth.module';
import { NftCollectionModule } from './nft-collection/nft-collection.module';
import { SyntheticRoleModule } from './synthetic-role/synthetic-role.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env['MONGO_URL'] as string),
    ProfileModule,
    AuthModule,
    NftCollectionModule,
    SyntheticRoleModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
