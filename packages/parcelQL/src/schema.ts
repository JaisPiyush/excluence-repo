export const comparisonOperators = [
    '=',
    '>',
    '<',
    '>=',
    '>=',
    '<>',
    'IN',
    'NOT IN',
    'IS NULL',
    'NOT NULL',
    'LIKE',
    'ILIKE'
] as const;

// TODO: Add NOT in filter
//TODO: Add DISTINCT column keyword
// TODO: Add having in query
// TODO: Replace ParcelQLSimpleColumn with ParcelQLColumn in ComFilters for adding functions supports

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

interface _CompFilter extends ParcelQLSimpleColumn {
    operator: ComparisonOps;
}

export type CompFilter = _CompFilter &
    ({ value: unknown } | { rightColumn: ParcelQLSimpleColumn });
export interface ParcelQLCase {
    when: { and: CompFilter[] } | { or: CompFilter[] } | CompFilter;
    then: unknown | ParcelQLSimpleColumn;
}

export interface ParcelQLCaseWhen {
    cases: ParcelQLCase[];
    else: unknown | ParcelQLSimpleColumn;
}

export const joins = ['INNER', 'FULL', 'LEFT', 'RIGHT'] as const;
export type JoinTypes = (typeof joins)[number];
export type ParcelQLJoin = {
    type: JoinTypes;
    on: ParcelQLFilter;
} & (
    | { table: string; alias?: string }
    | { table: ParcelQLQuery<'temporary_table'>; alias: string }
);

export const subqueryOps = ['IN', 'EXISTS'] as const;

export type ParcelQLSubquery =
    | {
          column: ParcelQLSimpleColumn;
          operator: (typeof subqueryOps)[0];
          subquery: ParcelQLQuery<'subquery'>;
      }
    | {
          operator: (typeof subqueryOps)[1];
          subquery: ParcelQLQuery<'subquery'>;
      };

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

export const queryActions = ['query', 'subquery', 'temporary_table'] as const;

export type QueryAction = (typeof queryActions)[number];

export interface ParcelQLQuery<Q = QueryAction> {
    action: Q;
    table: string | ParcelQLQuery<'temporary_table'>;
    columns: ParcelQLColumn[];
    filter?: ParcelQLFilter;
    join?: ParcelQLJoin;
    group_by?: Omit<ParcelQLColumn, 'alias'>[];
    having?: ParcelQLHaving;
    order_by?: ParcelQLOrderBy;
    limit?: number;
    offset?: number;
}
