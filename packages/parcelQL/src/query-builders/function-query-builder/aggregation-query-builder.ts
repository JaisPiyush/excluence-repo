import { Knex } from 'knex';
import { ParcelQLValidationError } from '../../error';
import {
    ParcelQLAggregationFunction,
    ParcelQLColumnFunction,
    ParcelQLSimpleColumnWithCase,
    aggregationFunctions,
    dateTimeFunctions
} from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { SimpleColumnWithCaseQueryBuilder } from '../colum-query-builder/simple-column-with-case-query-builder';

interface AggregationFunctionArgs {
    function: ParcelQLAggregationFunction | ParcelQLColumnFunction;
    parameters?: (string | unknown)[];
}

export class AggregationQueryBuilder
    extends BaseQueryBuilder<AggregationFunctionArgs>
    implements AggregationFunctionArgs
{
    public readonly function:
        | ParcelQLAggregationFunction
        | ParcelQLColumnFunction;
    public readonly parameters: unknown[];
    private colBuilder: SimpleColumnWithCaseQueryBuilder;

    constructor(
        public readonly query: AggregationFunctionArgs,
        public readonly column: ParcelQLSimpleColumnWithCase
    ) {
        super(query);
        this.function = query.function;
        this.parameters = query.parameters || [];
        this.colBuilder = new SimpleColumnWithCaseQueryBuilder(this.column);
    }

    onInit(): void {
        if (
            !aggregationFunctions.includes(this.query.function as any) &&
            !dateTimeFunctions.includes(this.query.function as any)
        ) {
            throw new ParcelQLValidationError(
                `function "${this.query.function}" is not supported.`
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const query = [`${this.function}(??`];
        const bindings: Knex.RawBinding[] = [this.colBuilder.build(knex)];
        this.parameters.forEach((param) => {
            query.push('?');
            bindings.push(param as any);
        });
        return knex.raw(query.join(',') + ')', bindings);
    }
}
