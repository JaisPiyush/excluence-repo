import { ParcelQLQuery } from '../schema';

interface TestCase {
    query: ParcelQLQuery;
    sql: string;
    bindings: unknown[];
}

const simpleSelectQueryTestCase: TestCase = {
    query: {
        action: 'query',
        columns: [
            {
                column: 'name'
            },
            {
                column: 'age'
            }
        ],
        table: 'users'
    },
    bindings: [],
    sql: 'select `name`, `age` from `users`'
};

const selectQueryWithWhereAndTypecasting: TestCase = {
    query: {
        action: 'query',
        table: 'users',
        filter: {
            column: 'age',
            operator: '>',
            type: 'integer',
            value: 25
        }
    },
    sql: 'select * from `users` where (`age`::integer > ?)',
    bindings: [25]
};

const selectQueryWithGroupByHavingTestCast: TestCase = {
    query: {
        action: 'query',
        table: 'users',
        columns: [
            {
                column: 'city'
            },
            {
                function: 'COUNT',
                parameters: [{ column: '*' }],
                alias: 'count'
            }
        ],
        group_by: [
            {
                column: 'city'
            }
        ],
        having: {
            column: {
                function: 'COUNT',
                parameters: [{ column: '*' }]
            },
            operator: '>',
            value: 5
        }
    },
    sql: 'select `city`, COUNT(*) as `count` from `users` group by `city` having (COUNT(*) > ?)',
    bindings: [5]
};

const queryWithASubquery: TestCase = {
    query: {
        action: 'query',
        columns: [
            {
                column: 'name'
            },
            {
                column: 'age'
            }
        ],
        filter: {
            column: 'age',
            operator: '>',
            value: 30
        },
        table: {
            action: 'subquery',
            columns: [{ column: 'city' }],
            table: 'cities',
            filter: {
                column: 'country',
                operator: '=',
                value: 'USA'
            }
        }
    },
    sql: "select `name`, `age` from select `city` from `cities` where (`country` = 'USA') where (`age` > ?)",
    bindings: [30]
};

const queryWithCaseWhen: TestCase = {
    query: {
        action: 'query',
        table: 'users',
        columns: [
            {
                column: 'name'
            },
            {
                column: {
                    cases: [
                        {
                            when: {
                                column: 'age',
                                operator: '>',
                                value: 30
                            },
                            then: 'Old'
                        },
                        {
                            when: {
                                column: 'age',
                                operator: '>=',
                                value: 18
                            },
                            then: 'Adult'
                        }
                    ],
                    else: 'Young'
                },
                alias: 'age_group'
            }
        ]
    },
    sql: 'select `name`, CASE WHEN `age` > ? THEN ? WHEN `age` >= ? THEN ? ELSE ? END as `age_group` from `users`',
    bindings: [30, 'Old', 18, 'Adult', 'Young']
};

const queryWithWindowFunction: TestCase = {
    query: {
        action: 'query',
        table: 'users',
        columns: [
            {
                column: 'name'
            },
            {
                window: {
                    order_by: {
                        expressions: [
                            {
                                column: 'age',
                                order: 'ASC'
                            }
                        ]
                    }
                },
                function: 'ROW_NUMBER',
                alias: 'row_num'
            }
        ]
    },
    sql: 'select `name`, ROW_NUMBER() OVER (ORDER BY `age` ASC) as `row_num` from `users`',
    bindings: []
};

export const testCases: TestCase[] = [
    simpleSelectQueryTestCase,
    selectQueryWithWhereAndTypecasting,
    selectQueryWithGroupByHavingTestCast,
    queryWithASubquery,
    queryWithCaseWhen,
    queryWithWindowFunction
];
