import { Knex } from 'knex';
import { ParcelQLValidationError } from '../../error';
import {
    ParcelQLOrderBy,
    ParcelQLSimpleColumn,
    ParcelQLSimpleColumnWithCase,
    ParcelQLWindow,
    ParcelQLWindowFunction,
    aggregationFunctions,
    windowFunctions
} from '../../schema';
import { BaseQueryBuilder } from '../base-query-builder';
import { OrderByQueryBuilder } from '../filter-query-builder/order-by-query-builder';
import { SimpleColumnQueryBuilder } from '../colum-query-builder/simple-column-query-builder';
import { SimpleColumnWithCaseQueryBuilder } from '../colum-query-builder/simple-column-with-case-query-builder';

interface WindowFunctionArgs {
    window: ParcelQLWindow;
    function: ParcelQLWindowFunction;
    parameters?: unknown[];
}

type WindowType = Partial<{
    order_by: ParcelQLOrderBy;
    partition_by: ParcelQLSimpleColumn[];
}>;

//TODO: Add support for column function on window args such as PARTITION BY DATE_TRUNC('hour', timestamp)

export class WindowFunctionQueryBuilder
    extends BaseQueryBuilder<WindowFunctionArgs>
    implements WindowFunctionArgs
{
    public readonly window: ParcelQLWindow;
    public readonly function: ParcelQLWindowFunction;
    public readonly parameters?: (unknown | ParcelQLSimpleColumnWithCase)[];

    constructor(public readonly query: WindowFunctionArgs) {
        super(query);
        this.window = query.window;
        this.function = query.function;
        this.parameters = query.parameters;
    }

    onInit(): void {
        const window = this.query.window as WindowType;
        if (!window.order_by && !window.partition_by) {
            throw new ParcelQLValidationError(
                `either order_by or partition_by is required`
            );
        }
        if (
            !aggregationFunctions.includes(this.query.function as any) &&
            !windowFunctions.includes(this.query.function as any)
        ) {
            throw new ParcelQLValidationError(
                `function "${this.query.function}" is not supported.`
            );
        }
    }

    protected _buildPartitionBy(knex: Knex): Knex.Raw {
        const expressions: Knex.Raw[] = (
            this.window as Pick<Required<WindowType>, 'partition_by'>
        ).partition_by.map((p_by) =>
            new SimpleColumnQueryBuilder(p_by).build(knex)
        );
        return knex.raw(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            `PARTITION BY ${expressions.map((e) => '?').join(', ')}`,
            expressions
        );
    }

    protected _buildFunction(knex: Knex): Knex.Raw {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const spots: string[] = [];
        const bindings = (this.parameters || []).map((param) => {
            spots.push('?');
            if ((param as ParcelQLSimpleColumnWithCase).column) {
                return new SimpleColumnWithCaseQueryBuilder(
                    param as ParcelQLSimpleColumnWithCase
                ).build(knex);
            }
            return param;
        });
        // bindings = bindings.concat((this.parameters || []) as any[]);
        return knex.raw(`${this.function}(${spots.join(', ')})`, bindings);
    }

    protected _build(knex: Knex<any, any[]>): Knex.Raw<any> {
        const expressions: Knex.Raw[] = [this._buildFunction(knex)];
        const spots: string[] = [];
        for (const [key, value] of Object.entries(this.window)) {
            if (key === 'order_by' && value) {
                const orderByBuilder = new OrderByQueryBuilder(
                    value as ParcelQLOrderBy
                );
                expressions.push(orderByBuilder.build(knex));
                spots.push('?');
            } else if (key === 'partition_by' && value) {
                expressions.push(this._buildPartitionBy(knex));
                spots.push('?');
            }
        }
        return knex.raw(`?? OVER (${spots.join(' ')})`, expressions);
    }
}
