import { HttpException, Injectable } from '@nestjs/common';
import { KnexSqliteService } from './knex-sqlite.service';
import { ParcelQLQuery, QueryBuilder } from 'parcelQL';
import { InjectKnex, Knex } from 'nestjs-knex';

@Injectable()
export class QueryService {
    constructor(
        private readonly knexMemoryDBService: KnexSqliteService,
        @InjectKnex() private readonly knex: Knex
    ) {}

    getRawQuery(query: ParcelQLQuery): string {
        const builder = new QueryBuilder(query);
        const sql = builder.build(this.knexMemoryDBService.get()).toQuery();
        return sql;
    }

    preSanitizeQuery(query: ParcelQLQuery): ParcelQLQuery {
        if (!query.table || typeof query.table === 'string') {
            query.table = 'flow_events';
        }
        query.limit = !query.limit || query.limit > 100 ? 100 : query.limit;
        return query;
    }

    async fetchData(query: ParcelQLQuery) {
        try {
            query = this.preSanitizeQuery(query);
            const builder = new QueryBuilder(query);
            const sql = builder
                .build(this.knex)
                .timeout(8 * 1000, { cancel: true });
            const res = await sql;
            return res;
        } catch (e) {
            throw new HttpException((e as Error).message, 400);
        }
    }
}
