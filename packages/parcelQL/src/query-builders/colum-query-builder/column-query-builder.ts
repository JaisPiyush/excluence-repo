import { Knex } from 'knex';
import { ParcelQLError, ParcelQLValidationError } from '../../error';
import {
    ParcelQLAggregationFunction,
    ParcelQLColumnFunction,
    ParcelQLWindow,
    ParcelQLWindowFunction,
    ParcelQLColumn,
    ParcelQLSimpleColumnWithCase,
    windowFunctions,
    aggregationFunctions,
    columnFunctions
} from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { SimpleColumnWithCaseQueryBuilder } from './simple-column-with-case-query-builder';
import { WindowFunctionQueryBuilder } from '../function-query-builder/window-query-builder';
import { AggregationQueryBuilder } from '../function-query-builder/aggregation-query-builder';

interface ColumnQueryBuilderArgs extends ParcelQLSimpleColumnWithCase {
    alias?: string;
    function?:
        | ParcelQLAggregationFunction
        | ParcelQLColumnFunction
        | ParcelQLWindowFunction;
    parameters?: unknown[];
    window?: ParcelQLWindow;
}

export class ColumnQueryBuilder extends BaseQueryBuilder<ParcelQLColumn> {
    public readonly alias?: string;
    public readonly function?:
        | ParcelQLAggregationFunction
        | ParcelQLColumnFunction
        | ParcelQLWindowFunction;
    public readonly parameters?: unknown[];
    public readonly window?: ParcelQLWindow;
    public readonly functionType?: 'agg' | 'window';
    public readonly column?: ParcelQLColumn['column'];
    public readonly type?: string | string[];

    constructor(public readonly query: ParcelQLColumn) {
        super(query);
        this.column = query.column;
        this.type = query.type;
        this.alias = query.alias;
        const data = query as ColumnQueryBuilderArgs;
        this.function = data.function;
        this.parameters = data.parameters;
        this.window = data.window;
        if (this.function) {
            if (
                (windowFunctions.includes(this.function as any) ||
                    aggregationFunctions.includes(this.function as any)) &&
                this.window
            ) {
                this.functionType = 'window';
            } else if (
                aggregationFunctions.includes(this.function as any) ||
                columnFunctions.includes(this.function as any)
            ) {
                this.functionType = 'agg';
            } else {
                throw new ParcelQLValidationError(
                    `function ${this.function} is not supported.`
                );
            }
        } else if (!this.column) {
            throw new ParcelQLError(
                `either functions or column should be provided`
            );
        }
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        let build: Knex.Raw;
        if (!this.function && this.column) {
            build = new SimpleColumnWithCaseQueryBuilder({
                column: this.column as ParcelQLSimpleColumnWithCase['column'],
                type: this.type
            }).build(knex);
        } else if (this.functionType === 'window') {
            const builder = new WindowFunctionQueryBuilder({
                window: this.window as ParcelQLWindow,
                function: this.function as ParcelQLWindowFunction,
                parameters: this.parameters
            });
            build = builder.build(knex);
        } else {
            const builder = new AggregationQueryBuilder({
                function: this.function as
                    | ParcelQLAggregationFunction
                    | ParcelQLColumnFunction,
                parameters: this.parameters
            });
            build = builder.build(knex);
        }
        if (this.alias) {
            return knex.raw('?? as ??', [build, this.alias]);
        }
        return build;
    }
}
