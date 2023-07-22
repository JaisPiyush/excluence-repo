export type ParcelQLColumn = {
    column: string | ParcelQLCaseWhen;
    type?: string;
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

interface ParcelQLCase {
    when: { column: string; operator: string; value: any };
    then: any;
}

export interface ParcelQLCaseWhen {
    column: string;
    cases: ParcelQLCase[];
    else: any;
}

export interface ParcelQLJoin {
    type: 'INNER' | 'LEFT' | 'RIGHT';
    table: ParcelQLQuery;
    on: ParcelQLFilter[];
}

export type ParcelQLFilter =
    | { and: ParcelQLFilter[] }
    | { or: ParcelQLFilter[] }
    | { column: string; operator: string; value: any };

export interface ParcelQLHaving {
    function: string;
    column: string;
    operator: string;
    value: any;
}

export interface ParcelQLOrderBy {
    column: string;
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
