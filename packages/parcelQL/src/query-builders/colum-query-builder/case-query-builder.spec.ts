import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { CaseQueryBuilder } from './case-query-builder';

describe('Tes CaseQueryBuilder', () => {
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

    // Single test case
    it('should pass for single condition', () => {
        const caseBuilder = new CaseQueryBuilder({
            when: {
                operator: '>',
                column: 'a',
                value: 2
            },
            then: true
        });

        const sql = caseBuilder.build(knex).toSQL();
        expect(sql.sql).to.eq('WHEN `a` > ? THEN ?');
        expect(sql.bindings).to.eql([2, true]);
    });
    // multiple test case
    it('should pass for multiple conditions', () => {
        const caseBuilder = new CaseQueryBuilder({
            when: {
                and: [
                    {
                        operator: '>',
                        column: 'a',
                        type: 'bigint',
                        value: 2
                    },
                    {
                        operator: '=',
                        column: 'c',
                        value: 'r'
                    }
                ]
            },
            then: true
        });

        const sql = caseBuilder.build(knex).toSQL();
        expect(sql.sql).to.eq('WHEN `a`::bigint > ? AND `c` = ? THEN ?');
        expect(sql.bindings).to.eql([2, 'r', true]);
    });
    // Test with column as return value
    it('should return column in then', () => {
        const builder = new CaseQueryBuilder({
            when: { column: 'a', operator: '>', value: 2 },
            then: { column: 'c' }
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('WHEN `a` > ? THEN `c`');
        expect(sql.bindings).to.eql([2]);
    });
});
