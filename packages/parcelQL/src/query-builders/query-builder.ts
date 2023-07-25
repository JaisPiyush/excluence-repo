/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from 'knex';
import { ParcelQLError, ParcelQLValidationError } from '../error';
import {
    ParcelQLColumn,
    ParcelQLFilter,
    ParcelQLHaving,
    ParcelQLJoin,
    ParcelQLOrderBy,
    ParcelQLQuery,
    ParcelQLSimpleColumn,
    queryActions
} from '../schema';
import { BaseQueryBuilder } from './base-query-builder';
import { ColumnQueryBuilder } from './colum-query-builder/column-query-builder';
import { FilterBuilder } from './filter-query-builder/filter-builder';

export class QueryBuilder
    extends BaseQueryBuilder<ParcelQLQuery, Knex.QueryBuilder>
    implements ParcelQLQuery
{
    public readonly action: 'query' | 'subquery' | 'temporary_table';
    public readonly table: string | ParcelQLQuery<'temporary_table'>;
    public readonly columns: ParcelQLColumn[];
    public readonly filter?: ParcelQLFilter | undefined;
    public readonly joins?: ParcelQLJoin[] | undefined;
    public readonly group_by?: ParcelQLSimpleColumn[] | undefined;
    public readonly having?: ParcelQLHaving | undefined;
    public readonly order_by?: ParcelQLOrderBy[];
    public readonly limit?: number | undefined;
    public readonly offset?: number | undefined;

    private colBuilders: ColumnQueryBuilder[] = [];
    public readonly isSubquery: boolean;

    constructor(
        public readonly query: ParcelQLQuery,
        isSubquery: boolean | undefined = undefined
    ) {
        super(query);
        this.action = query.action;
        this.isSubquery = !isSubquery && this.action === 'query';
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

    protected onInit(): void {
        if (!queryActions.includes(this.query.action)) {
            throw new ParcelQLValidationError(
                'query does not contains valid action'
            );
        }
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
            const temporary_table = new QueryBuilder(
                {
                    ...this.table,
                    action: 'temporary_table'
                },
                true
            );
            select.fromRaw(temporary_table.build(knex));
        }

        if (this.filter) {
            const filterBuilder = new FilterBuilder(this.filter);
            select.where(filterBuilder.build(knex));
        }

        return select;
    }
}
