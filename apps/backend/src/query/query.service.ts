import { Injectable } from '@nestjs/common';
import { KnexSqliteService } from './knex-sqlite.service';
import { ParcelQLQuery, QueryBuilder } from 'parcelQL';

@Injectable()
export class QueryService {
    constructor(private readonly knexMemoryDBService: KnexSqliteService) {}

    getRawQuery(query: ParcelQLQuery): string {
        const builder = new QueryBuilder(query);
        const sql = builder.build(this.knexMemoryDBService.get()).toQuery();
        return sql;
    }
}
