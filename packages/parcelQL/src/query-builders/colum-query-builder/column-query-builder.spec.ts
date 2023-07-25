import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { ColumnQueryBuilder } from './column-query-builder';
import { ParcelQLCaseWhen, ParcelQLSimpleColumnWithCase } from '../../schema';

describe('Tes ColumnQueryBuilder', () => {
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

    // Test simple column
    it('should build the query for single value string', () => {
        const colBuilder = new ColumnQueryBuilder({
            column: 'a',
            type: 'boolean'
        });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('`a`::boolean');
        expect(sql.bindings).to.eql([]);
    });
    // Test simple column with alias
    it('should build the query for single value string', () => {
        const colBuilder = new ColumnQueryBuilder({
            column: 'a',
            type: 'boolean',
            alias: 'isPresent'
        });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('`a`::boolean as `isPresent`');
        expect(sql.bindings).to.eql([]);
    });
    // Test case when column with alias
    it('should pass case when column with alias', () => {
        const args: ParcelQLCaseWhen = {
            cases: [
                {
                    when: { column: 'a', operator: '>', value: 2 },
                    then: 4
                },
                {
                    when: { column: 'b', operator: '<', value: 3 },
                    then: 5
                }
            ],
            else: 0
        };

        const builder = new ColumnQueryBuilder({
            column: args,
            alias: 'value'
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'CASE WHEN `a` > ? THEN ? WHEN `b` < ? THEN ? ELSE ? END as `value`'
        );
        expect(sql.bindings).to.eql([2, 4, 3, 5, 0]);
    });
    // Test aggregate function with alias
    it('should pass aggregate function with alias', () => {
        const col: ParcelQLSimpleColumnWithCase = {
            column: {
                cases: [
                    {
                        when: {
                            column: 'a',
                            operator: '>',
                            value: 2
                        },
                        then: { column: 'salePrice' }
                    }
                ],
                else: null
            }
        };
        const builder = new ColumnQueryBuilder({
            function: 'COUNT',
            alias: 'sale_count',
            parameters: [col]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'COUNT(CASE WHEN `a` > ? THEN `salePrice` ELSE ? END) as `sale_count`'
        );
        expect(sql.bindings).to.eql([2, null]);
    });
    // Test window function with alias
    it('should pass when using both window args but order_by first', () => {
        const builder = new ColumnQueryBuilder({
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
            function: 'COUNT',
            parameters: [{ column: 'salePrice' }],
            alias: 'sale_count'
        });

        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.equal(
            'COUNT(`salePrice`) OVER (ORDER BY `salePrice` ASC, `date` DESC PARTITION BY `salePrice`::bigint) as `sale_count`'
        );
        expect(sql.bindings).to.eql([]);
    });
});
