/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex';
import { ParcelQLError } from '../error';
import {
    ParcelQLColumn,
    ParcelQLFilter,
    ParcelQLHaving,
    ParcelQLJoin,
    ParcelQLOrderBy,
    ParcelQLQuery,
    ParcelQLSimpleColumn
} from '../schema';
import { BaseQueryBuilder } from './base-query-builder';
import { ColumnQueryBuilder } from './colum-query-builder/column-query-builder';

export class QueryBuilder
    extends BaseQueryBuilder<ParcelQLQuery, Knex.QueryBuilder>
    implements ParcelQLQuery
{
    public readonly action: 'query' | 'subquery';
    public readonly table: string | ParcelQLQuery;
    public readonly columns: ParcelQLColumn[];
    public readonly filter?: ParcelQLFilter | undefined;
    public readonly joins?: ParcelQLJoin[] | undefined;
    public readonly group_by?: ParcelQLSimpleColumn[] | undefined;
    public readonly having?: ParcelQLHaving | undefined;
    public readonly order_by?: ParcelQLOrderBy[];
    public readonly limit?: number | undefined;
    public readonly offset?: number | undefined;

    private colBuilders: ColumnQueryBuilder[] = [];

    constructor(
        public readonly query: ParcelQLQuery,
        public readonly isSubquery: boolean = false
    ) {
        super(query);
        this.action = this.isSubquery ? 'subquery' : 'query';
        if (this.isSubquery && typeof query.table !== 'string') {
            throw new ParcelQLError(`only 1 level deep query allowed`);
        }
        this.table = query.table;
        this.columns = query.columns;
        this.filter = query.filter;
        this.joins = query.joins;
        this.group_by = query.group_by;
        this.having = query.having;
        this.order_by = query.order_by;
        this.limit = query.limit || 100;
        this.offset = query.offset;
    }

    protected _beforeBuild(knex: Knex<any, any[]>): void {
        // Column builders created
        this.colBuilders = this.columns.map(
            (col) => new ColumnQueryBuilder(col)
        );
    }

    protected _build(knex: Knex<any, any[]>): Knex.QueryBuilder {
        const select = knex.select(
            this.colBuilders.map((col) => col.build(knex))
        );
        if (typeof this.table === 'string') {
            select.fromRaw(knex.raw('??', [this.table]));
        } else {
            const subquery = new QueryBuilder(this.table, true);
            select.fromRaw(subquery.build(knex));
        }
        return select;
    }
}
