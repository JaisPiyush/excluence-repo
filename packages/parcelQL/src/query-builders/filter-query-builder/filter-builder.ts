import { Knex } from 'knex';
import { CompFilter, ParcelQLFilter, ParcelQLSubquery } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { CompFilterQueryBuilder } from './comp-filter-query-builder';
import { SubQueryBuilder } from '../subquery-builder';
import { ParcelQLError } from '../../error';

export class FilterBuilder extends BaseQueryBuilder<ParcelQLFilter> {
    public readonly filter?: CompFilter;
    public readonly subquery?: ParcelQLSubquery;
    public readonly and?: ParcelQLFilter[];
    public readonly or?: ParcelQLFilter[];

    private readonly andBuilder?: FilterBuilder[];
    private readonly orBuilder?: FilterBuilder[];
    private readonly filterBuilder: CompFilterQueryBuilder | undefined;
    private readonly subqueryBuilder: SubQueryBuilder | undefined;

    constructor(
        public readonly query: ParcelQLFilter,
        private readonly level = 1
    ) {
        super(query);
        if ((query as { and: ParcelQLFilter[] }).and) {
            this.and = (query as { and: ParcelQLFilter[] }).and;
            this.andBuilder = this.and?.map(
                (a) => new FilterBuilder(a, this.level + 1)
            );
        } else if ((query as { or: ParcelQLFilter[] }).or) {
            this.or = (query as { or: ParcelQLFilter[] }).or;
            this.orBuilder = this.or.map(
                (e) => new FilterBuilder(e, this.level + 1)
            );
        } else if (this.level === 1 && (query as ParcelQLSubquery).subquery) {
            this.subquery = query as ParcelQLSubquery;
            this.subqueryBuilder = new SubQueryBuilder(this.subquery);
        } else if (
            (query as CompFilter).operator &&
            (query as ParcelQLSubquery).subquery === undefined
        ) {
            this.filter = query as CompFilter;
            this.filterBuilder = new CompFilterQueryBuilder(this.filter);
        } else {
            throw new ParcelQLError(
                'insufficient filter or subquery used deeper than root level'
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        if (this.andBuilder) {
            const params: string[] = [];
            const builds = this.andBuilder.map((e) => {
                params.push('?');
                return e.build(knex);
            });
            return knex.raw(`(${params.join(' AND ')})`, builds);
        }
        if (this.orBuilder) {
            const params: string[] = [];
            const builds = this.orBuilder.map((e) => {
                params.push('?');
                return e.build(knex);
            });
            return knex.raw(`(${params.join(' OR ')})`, builds);
        }
        if (this.subqueryBuilder) {
            return this.subqueryBuilder.build(knex);
        }
        if (this.filterBuilder) {
            return knex.raw('(?)', [this.filterBuilder.build(knex)]);
        }
        throw new ParcelQLError('invalid filter require.');
    }
}
