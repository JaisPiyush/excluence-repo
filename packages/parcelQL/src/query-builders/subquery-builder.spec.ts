import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { SubQueryBuilder } from './subquery-builder';

describe('Test SubQueryBuilder', () => {
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

    // Test with wrong operator
    it('should throw err due to invalid operator', () => {
        expect(() => {
            new SubQueryBuilder({
                subquery: {
                    action: 'query',
                    table: 'table_1',
                    columns: [
                        {
                            column: '*'
                        }
                    ]
                },
                operator: 'OR' as any
            });
        }).to.throw('operator is not supported in the subquery.');
    });
    // Test with IN without column
    it('should throw err due to no column with IN', () => {
        expect(() => {
            new SubQueryBuilder({
                subquery: {
                    action: 'query',
                    table: 'table_1',
                    columns: [
                        {
                            column: '*'
                        }
                    ]
                },
                operator: 'IN' as any
            });
        }).to.throw('column is required for "IN" based subquery.');
    });
    // Test with IN success
    it('should PASS with IN', () => {
        const builder = new SubQueryBuilder({
            subquery: {
                action: 'query',
                table: 'table_1',
                columns: [
                    {
                        column: '*'
                    }
                ]
            },
            operator: 'IN',
            column: {
                column: 'film'
            }
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('`film` IN (select * from `table_1`)');
    });
    // Test with Exists
    it('should pass with EXISTS', () => {
        const builder = new SubQueryBuilder({
            subquery: {
                action: 'query',
                table: 'table_1',
                columns: [
                    {
                        column: '*'
                    }
                ]
            },
            operator: 'EXISTS'
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('EXISTS (select * from `table_1`)');
    });
});
