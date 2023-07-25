import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { WindowFunctionQueryBuilder } from './window-query-builder';

describe('Test AggregationQueryBuilder', () => {
    let knex: Knex;

    before(() => {
        knex = _knex({
            client: 'sqlite3',
            connection: {
                filename: ':memory:'
            },
            useNullAsDefault: true
        });
    });

    after(async () => {
        await knex.destroy();
    });

    // Test without order_by and partition_by to throw error
    it('should throw error when empty window', () => {
        expect(() => {
            new WindowFunctionQueryBuilder(
                {
                    window: {} as any,
                    function: 'LAG'
                },
                { column: 'salePrice' }
            );
        }).to.throw('either order_by or partition_by is required');
    });
    // Test with un-supported functions
    it('should throw error when empty window', () => {
        expect(() => {
            new WindowFunctionQueryBuilder(
                {
                    window: { partition_by: [{ column: 'salePrice' }] },
                    function: 'LAGER' as any
                },
                { column: 'salePrice' }
            );
        }).to.throw('function "LAGER" is not supported.');
    });
    // Test with only partition by and multi-params
    it('should pass when using partition_by with parameters', () => {
        const builder = new WindowFunctionQueryBuilder(
            {
                window: {
                    partition_by: [
                        {
                            column: 'salePrice',
                            type: 'bigint'
                        }
                    ]
                },
                function: 'LAG',
                parameters: [1, 0]
            },
            {
                column: 'salePrice'
            }
        );

        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.equal(
            'LAG(`salePrice`, ?, ?) OVER (PARTITION BY `salePrice`::bigint)'
        );
        expect(sql.bindings).to.eql([1, 0]);
    });
    // Test with only order_by and single-params
    it('should pass when using order_by without parameters', () => {
        const builder = new WindowFunctionQueryBuilder(
            {
                window: {
                    order_by: {
                        expressions: [
                            {
                                column: 'salePrice'
                            },
                            {
                                column: 'date',
                                order: 'DESC'
                            }
                        ]
                    }
                },
                function: 'COUNT'
            },
            {
                column: 'salePrice'
            }
        );

        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.equal(
            'COUNT(`salePrice`) OVER (ORDER BY `salePrice` ASC, `date` DESC)'
        );
        expect(sql.bindings).to.eql([]);
    });
    // Test with both wit partition_byfirst
    it('should pass when using both window args but partition_by first', () => {
        const builder = new WindowFunctionQueryBuilder(
            {
                window: {
                    partition_by: [
                        {
                            column: 'salePrice',
                            type: 'bigint'
                        }
                    ],
                    order_by: {
                        expressions: [
                            {
                                column: 'salePrice'
                            },
                            {
                                column: 'date',
                                order: 'DESC'
                            }
                        ]
                    }
                },
                function: 'COUNT'
            },
            {
                column: 'salePrice'
            }
        );

        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.equal(
            'COUNT(`salePrice`) OVER (PARTITION BY `salePrice`::bigint ORDER BY `salePrice` ASC, `date` DESC)'
        );
        expect(sql.bindings).to.eql([]);
    });
    // Test both with order_by first
    it('should pass when using both window args but order_by first', () => {
        const builder = new WindowFunctionQueryBuilder(
            {
                window: {
                    order_by: {
                        expressions: [
                            {
                                column: 'salePrice'
                            },
                            {
                                column: 'date',
                                order: 'DESC'
                            }
                        ]
                    },
                    partition_by: [
                        {
                            column: 'salePrice',
                            type: 'bigint'
                        }
                    ]
                },
                function: 'COUNT'
            },
            {
                column: 'salePrice'
            }
        );

        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.equal(
            'COUNT(`salePrice`) OVER (ORDER BY `salePrice` ASC, `date` DESC PARTITION BY `salePrice`::bigint)'
        );
        expect(sql.bindings).to.eql([]);
    });
});
