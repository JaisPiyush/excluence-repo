import { Module } from '@nestjs/common';
import { QueryController } from './query.controller';
import { QueryService } from './query.service';
import { ThrottlerModule } from '@nestjs/throttler';
import { KnexModule } from 'nestjs-knex';
import { useKnexModuleConfig } from '../app.imports';
import { KnexSqliteService } from './knex-sqlite.service';

@Module({
    imports: [
        KnexModule.forRoot({
            config: useKnexModuleConfig()
        }),
        // For customization of throttler (https://docs.nestjs.com/security/rate-limiting#proxies)
        ThrottlerModule.forRoot({
            ttl: 60,
            limit: 10
        })
    ],
    controllers: [QueryController],
    providers: [KnexSqliteService, QueryService]
})
export class QueryModule {}
