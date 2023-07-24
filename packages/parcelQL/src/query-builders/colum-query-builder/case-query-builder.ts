import { Knex } from 'knex';
import { CaseFilter, ParcelQLCase } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';

export class CaseQueryBuilder
    extends BaseQueryBuilder<ParcelQLCase>
    implements ParcelQLCase
{
    public readonly when:
        | CaseFilter
        | { and: CaseFilter[] }
        | { or: CaseFilter[] };
    public readonly then: unknown;

    constructor(public readonly query: ParcelQLCase) {
        super(query);
        this.when = query.when;
        this.then = query.then;
    }

    private _buildSingleCaseFilter(
        when: CaseFilter
    ): [string, Knex.RawBinding[]] {
        
    }
}
