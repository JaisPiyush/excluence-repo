import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { ParcelQLCaseWhen } from '../../schema';
import { CaseWhenQueryBuilder } from './case-when-query-builder';

describe('Test CaseWhenQueryBuilder', () => {
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

    // Test multiple cases
    it('should pass', () => {
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

        const builder = new CaseWhenQueryBuilder(args);
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'CASE WHEN `a` > ? THEN ? WHEN `b` < ? THEN ? ELSE ? END'
        );
        expect(sql.bindings).to.eql([2, 4, 3, 5, 0]);
    });
    it('should return column in then', () => {
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
            else: { column: 'r' }
        };

        const builder = new CaseWhenQueryBuilder(args);
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'CASE WHEN `a` > ? THEN ? WHEN `b` < ? THEN ? ELSE `r` END'
        );
        expect(sql.bindings).to.eql([2, 4, 3, 5]);
    });
});
