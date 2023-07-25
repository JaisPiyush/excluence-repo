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
    public readonly parameters: (unknown | ParcelQLSimpleColumnWithCase)[];

    constructor(public readonly query: AggregationFunctionArgs) {
        super(query);
        this.function = query.function;
        this.parameters = query.parameters || [];
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
        const query: string[] = [];
        const bindings: Knex.RawBinding[] = [];
        this.parameters.forEach((param) => {
            query.push('?');
            if ((param as ParcelQLSimpleColumnWithCase).column) {
                const col = new SimpleColumnWithCaseQueryBuilder(
                    param as ParcelQLSimpleColumnWithCase
                );
                bindings.push(col.build(knex));
            } else {
                bindings.push(param as any);
            }
        });
        return knex.raw(`${this.function}(${query.join(',')})`, bindings);
    }
}
