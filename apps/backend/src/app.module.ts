import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { QueryModule } from './query/query.module';

@Module({
  imports: [QueryModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
