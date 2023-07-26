import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { QueryBuilder } from './query-builder';

describe('Test QueryBuilder', () => {
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

    // Simple select with string table
    it('should create sql with simple column selects and string table', () => {
        const builder = new QueryBuilder({
            action: 'query',
            table: 'table_1',
            columns: [
                {
                    column: ['payload', 'nftType', 'typeID'],
                    alias: 'nft'
                }
            ]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.method).to.equal('select');
        expect(sql.sql).to.eq(
            'select (`payload`->?->>?) as `nft` from `table_1`'
        );
        expect(sql.bindings).to.eql(['nftType', 'typeID']);
    });
    // Testing distinct and distinct on
    it('should create sql with simple column selects and distinct and string table', () => {
        const builder = new QueryBuilder({
            action: 'query',
            table: 'table_1',
            columns: [
                {
                    column: ['payload', 'nftType', 'typeID'],
                    alias: 'nft'
                }
            ],
            distinct: {
                columns: [
                    {
                        column: 'a'
                    }
                ]
            }
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.method).to.equal('select');
        expect(sql.sql).to.eq(
            'select (`payload`->?->>?) as `nft`, DISTINCT `a` from `table_1`'
        );
        expect(sql.bindings).to.eql(['nftType', 'typeID']);
    });
});
