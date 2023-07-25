import { Knex } from 'knex';
import { CompFilter, ParcelQLCase, ParcelQLSimpleColumn } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { CompFilterQueryBuilder } from '../filter-query-builder/comp-filter-query-builder';
import { ParcelQLError, ParcelQLValidationError } from '../../error';
import { SimpleColumnQueryBuilder } from './simple-column-query-builder';

export class CaseQueryBuilder
    extends BaseQueryBuilder<ParcelQLCase>
    implements ParcelQLCase
{
    public readonly when:
        | { and: CompFilter[] }
        | { or: CompFilter[] }
        | CompFilter;
    public readonly then: unknown | ParcelQLSimpleColumn;

    private filters: CompFilterQueryBuilder[] = [];
    private logicalOperator: 'AND' | 'OR' | undefined;

    constructor(public readonly query: ParcelQLCase) {
        super(query);
        this.when = query.when;
        this.then = query.then;
    }

    onInit(): void {
        if (this.query.then === undefined) {
            throw new ParcelQLValidationError(
                `then value cannot be undefined.`
            );
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    protected _beforeBuild(knex: Knex): void {
        if ((this.query.when as { and: CompFilter[] }).and) {
            this.filters = (this.query.when as { and: CompFilter[] }).and.map(
                (filter) => new CompFilterQueryBuilder(filter)
            );
            this.logicalOperator = 'AND';
        } else if ((this.query.when as { or: CompFilter[] }).or) {
            this.filters = (this.query.when as { or: CompFilter[] }).or.map(
                (filter) => new CompFilterQueryBuilder(filter)
            );
            this.logicalOperator = 'OR';
        } else if ((this.query.when as CompFilter).operator) {
            this.filters = [
                new CompFilterQueryBuilder(this.query.when as CompFilter)
            ];
            this.logicalOperator = undefined;
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const filters = this.filters.map((filter) => filter.build(knex));
        if (filters.length === 0) throw new ParcelQLError(`invalid case query`);
        const spots: string[] = [];
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        for (const _ in filters) {
            spots.push('??');
        }
        let params: Knex.RawBinding[] = filters;
        const then =
            this.then && (this.then as ParcelQLSimpleColumn).column
                ? new SimpleColumnQueryBuilder(
                      this.then as ParcelQLSimpleColumn
                  ).build(knex)
                : this.then;
        params = params.concat([then]);
        const conditions = this.logicalOperator
            ? spots.join(` ${this.logicalOperator} `)
            : spots.join('');
        return knex.raw(`WHEN ${conditions} THEN ?`, params);
    }
}
