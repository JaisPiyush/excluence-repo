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

export type ComparisonOps = (typeof comparisonOperators)[number];

export type ParcelQLSimpleColumn = {
    column: string | string[];
    type?: string | string[];
};

export interface ParcelQLSimpleColumnWithCase {
    column: string | string[] | ParcelQLCaseWhen;
    type?: string | string[];
}

export type ParcelQLColumn = Partial<ParcelQLSimpleColumnWithCase> & {
    alias?: string;
} & (
        | {
              function: ParcelQLAggregationFunction | ParcelQLColumnFunction;
              parameters?: (unknown | ParcelQLSimpleColumnWithCase)[];
          }
        | {
              window: ParcelQLWindow;
              function: ParcelQLWindowFunction;
              parameters?: (unknown | ParcelQLSimpleColumnWithCase)[];
          }
        // eslint-disable-next-line @typescript-eslint/ban-types
        | {}
    );
export interface ParcelQLColumnWithoutWindow
    extends Partial<ParcelQLSimpleColumnWithCase> {
    alias?: string;
    function?: ParcelQLAggregationFunction | ParcelQLColumnFunction;
    parameters?: (unknown | ParcelQLSimpleColumnWithCase)[];
}

export const dateTimeFunctions = ['DATE_TRUNC', 'DATE_PART'] as const;
export type ParcelQLDateTimeFunction = (typeof dateTimeFunctions)[number];
export const columnFunctions = dateTimeFunctions;
export type ParcelQLColumnFunction = ParcelQLDateTimeFunction;

export interface ComparisonFilterColumn
    extends Partial<ParcelQLSimpleColumnWithCase> {
    function?: ParcelQLAggregationFunction | ParcelQLColumnFunction;
    parameters?: (unknown | ParcelQLSimpleColumnWithCase)[];
}

interface _CompFilter {
    column: string | string[] | ComparisonFilterColumn;
    operator: ComparisonOps;
    type?: string | string[];
}

export type CompFilter = _CompFilter &
    ({ value: unknown } | { rightColumn: ComparisonFilterColumn });
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
          partition_by: ParcelQLColumn[];
      }
    | {
          order_by: ParcelQLOrderBy;
      }
    | { partition_by: ParcelQLColumn[] };

// export interface ParcelQLTimeSeriesFunction {}

export const queryActions = ['query', 'subquery', 'temporary_table'] as const;

export type QueryAction = (typeof queryActions)[number];

export interface ParcelQLDistinct {
    on?: ParcelQLSimpleColumn;
    columns: ParcelQLColumnWithoutWindow[];
}

export interface ParcelQLQuery<Q = QueryAction> {
    action: Q;
    table: string | ParcelQLQuery<'subquery'>;
    columns?: ParcelQLColumn[];
    distinct?: ParcelQLDistinct;
    filter?: ParcelQLFilter;
    join?: ParcelQLJoin;
    group_by?: Omit<ParcelQLColumn, 'alias'>[];
    having?: ParcelQLFilter;
    order_by?: ParcelQLOrderBy;
    limit?: number;
    offset?: number;
}
