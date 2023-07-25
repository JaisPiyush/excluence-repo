import { Knex } from 'knex';
import {
    ParcelQLQuery,
    ParcelQLSimpleColumn,
    ParcelQLSubquery,
    subqueryOps
} from '../schema';
import { BaseQueryBuilder } from './base-query-builder';
import { ParcelQLError, ParcelQLValidationError } from '../error';
import { ColumnQueryBuilder } from './colum-query-builder/column-query-builder';
import { QueryBuilder } from './query-builder';

export class SubQueryBuilder extends BaseQueryBuilder<
    ParcelQLSubquery,
    Knex.Raw
> {
    public readonly subquery: ParcelQLQuery<'subquery'>;
    public readonly column?: ParcelQLSimpleColumn;
    public readonly operator: (typeof subqueryOps)[number];

    private colBuilder?: ColumnQueryBuilder;
    private subqueryBuilder: QueryBuilder;

    constructor(public readonly query: ParcelQLSubquery) {
        super(query);
        this.subquery = query.subquery;
        this.operator = query.operator;
        this.column = (query as { column?: ParcelQLSimpleColumn }).column;
        if (this.column) {
            this.colBuilder = new ColumnQueryBuilder(this.column);
        }
        this.subqueryBuilder = new QueryBuilder(this.subquery, true);
    }

    onInit(): void {
        if (!subqueryOps.includes(this.query.operator)) {
            throw new ParcelQLValidationError(
                `operator is not supported in the subquery.`
            );
        }
        if (this.query.operator === 'IN' && this.query.column === undefined) {
            throw new ParcelQLError(
                'column is required for "IN" based subquery.'
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw {
        const subquery = this.subqueryBuilder.build(knex);
        if (this.column && this.colBuilder) {
            const column = this.colBuilder.build(knex);
            return knex.raw('?? IN (??)', [column, subquery]);
        }
        return knex.raw('EXISTS (??)', [subquery]);
    }
}
