import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { CompFilterQueryBuilder } from './comp-filter-query-builder';

describe('Test CompFilterQueueBuilder', () => {
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

    // Test invalid operator
    it('should throw error on invalid operator', () => {
        expect(() => {
            new CompFilterQueryBuilder({
                column: 'a',
                operator: '%' as any,
                value: 2
            });
        }).to.throw(`filter operator "%" is not supported.`);
    });
    // Test with valid operator
    it('should pass', () => {
        const filterBuilder = new CompFilterQueryBuilder({
            column: 'a',
            operator: '>',
            value: 2
        });
        const sql = filterBuilder.build(knex).toSQL();
        expect(sql.sql).to.eq('`a` > ?');
        expect(sql.bindings).to.eql([2]);
    });
});
