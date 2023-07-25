import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { QueryBuilder } from './query-builder';
import { testCases } from './full-test.fixture';

describe('Test Full test QueryBuilder', () => {
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
    it('should pass', () => {
        for (const testCase of testCases) {
            const builder = new QueryBuilder(testCase.query);
            const sql = builder.build(knex).toSQL();
            expect(sql.sql).to.eq(testCase.sql);
            expect(sql.bindings).to.eql(testCase.bindings);
        }
    });
});
