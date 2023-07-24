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
              parameters?: (string | unknown)[];
          }
        | { window: ParcelQLWindow; function: ParcelQLWindowFunction }
        // eslint-disable-next-line @typescript-eslint/ban-types
        | {}
    );

export type ParcelQLDateTimeFunction = 'DATE_TRUNC' | 'DATE_PART';
export type ParcelQLColumnFunction = ParcelQLDateTimeFunction;

export interface CompFilter extends ParcelQLSimpleColumn {
    operator: ComparisonOps;
    value: unknown;
}
export interface ParcelQLCase {
    when: { and: CompFilter[] } | { or: CompFilter[] } | CompFilter;
    then: unknown;
}

export interface ParcelQLCaseWhen {
    column: ParcelQLSimpleColumn;
    cases: ParcelQLCase[];
    else: unknown;
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

export interface ParcelQLOrderBy {
    column: ParcelQLSimpleColumn;
    order: 'asc' | 'desc';
}

export type ParcelQLAggregationFunction =
    | 'AVG'
    | 'COUNT'
    | 'MAX'
    | 'MIN'
    | 'SUM';

export type ParcelQLWindowFunction =
    | ParcelQLAggregationFunction
    | 'ROW_NUMBER'
    | 'RANK'
    | 'DENSE_RANK'
    | 'LAG'
    | 'LEAD';

export interface ParcelQLWindow {
    order_by?: ParcelQLOrderBy;
    partition_by?: string[];
}

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
