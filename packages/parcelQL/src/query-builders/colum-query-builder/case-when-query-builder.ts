import { Knex } from 'knex';
import { ParcelQLCase, ParcelQLCaseWhen } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { CaseQueryBuilder } from './case-query-builder';

export class CaseWhenQueryBuilder
    extends BaseQueryBuilder<ParcelQLCaseWhen>
    implements ParcelQLCaseWhen
{
    public readonly cases: ParcelQLCase[];
    public readonly else: unknown;

    private caseBuilders: CaseQueryBuilder[];

    constructor(public readonly query: ParcelQLCaseWhen) {
        super(query);
        this.cases = query.cases;
        this.else = query.else;
        this.caseBuilders = this.cases.map((_case) => {
            return new CaseQueryBuilder(_case);
        });
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const queryArray = ['CASE'];
        const caseRaws: Knex.RawBinding[] = this.caseBuilders.map((builder) => {
            queryArray.push('??');
            return builder.build(knex);
        });
        queryArray.push('ELSE');
        queryArray.push('?');
        queryArray.push('END');
        return knex.raw(queryArray.join(' '), caseRaws.concat([this.else]));
    }
}
