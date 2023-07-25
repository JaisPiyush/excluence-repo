import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { OrderByQueryBuilder } from './order-by-query-builder';

describe('Test OrderByQueueBuilder', () => {
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

    // Test with invalid order parameter
    it('should throw error due to invalid order parameter', () => {
        expect(() => {
            new OrderByQueryBuilder({
                expressions: [
                    {
                        column: 'a',
                        order: 'T'
                    } as any
                ]
            });
        }).to.throw(`order_by must be either ASC or DESC`);
    });
    // Test with single expression
    it('should pass with single express', () => {
        const builder = new OrderByQueryBuilder({
            expressions: [
                {
                    column: 'a',
                    order: 'ASC'
                }
            ]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('ORDER BY `a` ASC');
    });
    // Test with multiple expressions
    it('should pass with single express', () => {
        const builder = new OrderByQueryBuilder({
            expressions: [
                {
                    column: 'a',
                    order: 'ASC'
                },
                {
                    column: 'b'
                }
            ]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('ORDER BY `a` ASC, `b` ASC');
    });
});
