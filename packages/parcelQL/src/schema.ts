export const comparisonOperators = ['=', '>', '<', '>=', '>=', '<>'] as const;

export type ComparisonOps = (typeof comparisonOperators)[number];

export type ParcelQLSimpleColumn = {
    column: string | string[];
    type?: string | string[];
};

export interface ParcelQLSimpleColumnWithCase {
    column: string | string[] | ParcelQLCaseWhen;
    type?: string | string[];
}

export type ParcelQLColumn = ParcelQLSimpleColumnWithCase & {
    alias?: string;
} & (
        | {
              function: ParcelQLAggregationFunction | ParcelQLColumnFunction;
              parameters?: unknown[];
          }
        | {
              window: ParcelQLWindow;
              function: ParcelQLWindowFunction;
              parameters?: unknown[];
          }
        // eslint-disable-next-line @typescript-eslint/ban-types
        | {}
    );

export const dateTimeFunctions = ['DATE_TRUNC', 'DATE_PART'] as const;
export type ParcelQLDateTimeFunction = (typeof dateTimeFunctions)[number];
export const columnFunctions = dateTimeFunctions;
export type ParcelQLColumnFunction = ParcelQLDateTimeFunction;

export interface CompFilter extends ParcelQLSimpleColumn {
    operator: ComparisonOps;
    value: unknown;
}
export interface ParcelQLCase {
    when: { and: CompFilter[] } | { or: CompFilter[] } | CompFilter;
    then: unknown | ParcelQLSimpleColumn;
}

export interface ParcelQLCaseWhen {
    cases: ParcelQLCase[];
    else: unknown | ParcelQLSimpleColumn;
}

export interface ParcelQLJoin {
    type: 'INNER' | 'LEFT' | 'RIGHT';
    table: ParcelQLQuery;
    on: ParcelQLFilter[];
}

export type ParcelQLSubquery =
    | {
          column: ParcelQLSimpleColumn;
          operator: 'IN';
          subquery: ParcelQLQuery;
      }
    | { operator: 'EXISTS'; subquery: ParcelQLQuery };

export type ParcelQLFilter =
    | { and: ParcelQLFilter[] }
    | { or: ParcelQLFilter[] }
    | CompFilter
    | ParcelQLSubquery;

export interface ParcelQLHaving {
    function: string;
    column: ParcelQLSimpleColumn;
    operator: string;
    value: any;
}

export const orderByOrders = ['ASC', 'DESC'] as const;

export interface OrderByExpr extends ParcelQLSimpleColumn {
    order?: (typeof orderByOrders)[number];
}
export interface ParcelQLOrderBy {
    expressions: OrderByExpr[];
}

export const aggregationFunctions = [
    'AVG',
    'COUNT',
    'SUM',
    'MAX',
    'MIN'
] as const;

export type ParcelQLAggregationFunction = (typeof aggregationFunctions)[number];

export const windowFunctions = [
    'ROW_NUMBER',
    'RANK',
    'DENSE_RANK',
    'LAG',
    'LEAD'
] as const;

export type ParcelQLWindowFunction =
    | (typeof windowFunctions)[number]
    | ParcelQLAggregationFunction;
export type ParcelQLWindow =
    | {
          order_by: ParcelQLOrderBy;
          partition_by: ParcelQLSimpleColumn[];
      }
    | {
          order_by: ParcelQLOrderBy;
      }
    | { partition_by: ParcelQLSimpleColumn[] };

// export interface ParcelQLTimeSeriesFunction {}

export interface ParcelQLQuery {
    action: 'query';
    table: string | ParcelQLQuery;
    columns: (string | ParcelQLColumn)[];
    filter?: ParcelQLFilter;
    joins?: ParcelQLJoin[];
    group_by?: string[];
    having?: ParcelQLHaving;
    order_by: ParcelQLOrderBy[];
    limit?: number;
    offset?: number;
}
