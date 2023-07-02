import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { NftCollectionModule } from './nft-collection/nft-collection.module';

@Module({
    imports: [
        MongooseModule.forRoot(process.env['MONGO_URL'] as string),
        NftCollectionModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
