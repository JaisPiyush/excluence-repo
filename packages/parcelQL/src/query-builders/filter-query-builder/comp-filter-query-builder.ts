import { Knex } from 'knex';
import { ParcelQLValidationError } from '../../error';
import { ComparisonOps, CompFilter, comparisonOperators } from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { SimpleColumnQueryBuilder } from '../colum-query-builder/simple-column-query-builder';

export class CompFilterQueryBuilder
    extends BaseQueryBuilder<CompFilter>
    implements CompFilter
{
    public readonly operator: ComparisonOps;
    public readonly value: unknown;
    public readonly column: string | string[];
    public readonly type?: string | string[] | undefined;
    private readonly _colBuilder: SimpleColumnQueryBuilder;

    constructor(public readonly query: CompFilter) {
        super(query);
        this._colBuilder = new SimpleColumnQueryBuilder({
            column: query.column,
            type: query.type
        });
        this.column = query.column;
        this.type = query.type;
        this.operator = query.operator;
        this.value = query.value;
    }

    onInit(): void {
        if (!comparisonOperators.includes(this.query.operator)) {
            throw new ParcelQLValidationError(
                `filter operator "${this.query.operator}" is not supported.`
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const column = this._colBuilder.build(knex);
        return knex.raw(`?? ${this.operator} ?`, [column, this.value]);
    }
}
