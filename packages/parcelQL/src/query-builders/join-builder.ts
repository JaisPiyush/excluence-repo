import { Knex } from 'knex';
import { ParcelQLValidationError } from '../error';
import {
    JoinTypes,
    ParcelQLFilter,
    ParcelQLJoin,
    ParcelQLQuery,
    ParcelQLSimpleColumn,
    joins
} from '../schema';
import { BaseQueryBuilder } from './base-query-builder';
import { FilterBuilder } from './filter-query-builder/filter-builder';
import { QueryBuilder } from './query-builder';

export class JoinBuilder extends BaseQueryBuilder<ParcelQLJoin> {
    public readonly type: JoinTypes;
    public readonly table?: ParcelQLQuery<'temporary_table'> | string;
    public readonly columns?: ParcelQLSimpleColumn[];
    public readonly on: ParcelQLFilter;
    public readonly alias?: string;

    private onBuilder: FilterBuilder;
    private queryBuilder?: QueryBuilder;

    constructor(public readonly query: ParcelQLJoin) {
        super(query);
        this.type = query.type;
        this.on = query.on;
        this.onBuilder = new FilterBuilder(this.on);
        this.alias = query.alias;
        this.table = query.table;
        if (typeof this.table !== 'string') {
            this.queryBuilder = new QueryBuilder(this.table, true);
        }
    }

    protected onInit(): void {
        if (!joins.includes(this.query.type.toUpperCase() as JoinTypes)) {
            throw new ParcelQLValidationError('invalid join type');
        }
        if (
            typeof this.query.table !== 'string' &&
            (this.query.table.action !== 'temporary_table' ||
                this.query.alias === undefined)
        ) {
            throw new ParcelQLValidationError(
                'only temporary table action supported in joins and alias is required for temporary table'
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        if (!this.queryBuilder) {
            let query = `${this.type} JOIN ??`;
            const params: Knex.RawBinding[] = [this.table as string];
            if (this.alias) {
                query += ' ??';
                params.push(this.alias);
            }
            query += ' ON ?';
            params.push(this.onBuilder.build(knex));
            return knex.raw(query, params);
        }
        return knex.raw(`${this.type} JOIN ? ?? ON ?`, [
            this.queryBuilder.build(knex),
            this.alias,
            this.onBuilder.build(knex)
        ]);
    }
}
