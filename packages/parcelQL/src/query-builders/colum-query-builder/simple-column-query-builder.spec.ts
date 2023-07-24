import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { SimpleColumnQueryBuilder } from './simple-column-query-builder';

describe('Testing SimpleColumnQueryBuilder', () => {
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

    // Test error on undefined or null or empty array column
    it('should through error due to invalid column value', () => {
        // Undefined column
        expect(() => {
            new SimpleColumnQueryBuilder({} as any);
        }).to.throw(`column value "undefined" is not valid`);
        expect(() => {
            new SimpleColumnQueryBuilder({ column: null } as any);
        }).to.throw(`column value "null" is not valid`);
        expect(() => {
            new SimpleColumnQueryBuilder({ column: '' });
        }).to.throw(`column value "" is not valid`);
        expect(() => {
            new SimpleColumnQueryBuilder({ column: [] });
        }).to.throw(`column value "" is not valid`);
    });
    // Test error on null or non-string type
    it('should through error due to invalid typen value', () => {
        expect(() => {
            new SimpleColumnQueryBuilder({ column: 'a', type: true as any });
        }).to.throw(`column typecasting to "true" is not valid`);
        expect(() => {
            new SimpleColumnQueryBuilder({ column: 'a', type: null as any });
        }).to.throw(`column typecasting to "null" is not valid`);
    });
    // Test column as string without typecasting
    it('should build the query for single value string', () => {
        const colBuilder = new SimpleColumnQueryBuilder({ column: 'a' });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('`a`');
        expect(sql.bindings).to.eql([]);
    });
    // Test column as string[] with single element without typecasting
    it('should build the query for single value in string array', () => {
        const colBuilder = new SimpleColumnQueryBuilder({ column: ['a'] });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('`a`');
        expect(sql.bindings).to.eql([]);
    });
    // Test json extract column without typecasting
    it('should build the query for json extract', () => {
        const colBuilder = new SimpleColumnQueryBuilder({
            column: ['a', 'b', 'c']
        });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('(`a`->?->>?)');
        expect(sql.bindings).to.eql(['b', 'c']);
    });
    // Test typecast should throw error on invalid type
    it('should throw error for the single string value column with invalid typecasting', () => {
        const colBuilder = new SimpleColumnQueryBuilder({
            column: 'a',
            type: 'number'
        });
        expect(() => {
            colBuilder.build(knex);
        }).to.throw(`Data type "number" is not supported.`);
    });
    // Test column as string with typecasting
    it('should build the query for single value string', () => {
        const colBuilder = new SimpleColumnQueryBuilder({
            column: 'a',
            type: 'boolean'
        });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('`a`::boolean');
        expect(sql.bindings).to.eql([]);
    });

    // Test column as json extract with typecasting
    it('should build the query for json extract', () => {
        const colBuilder = new SimpleColumnQueryBuilder({
            column: ['a', 'b', 'c'],
            type: ['text', 'bigint']
        });
        const raw = colBuilder.build(knex);
        const sql = raw.toSQL();
        expect(sql.sql).to.eq('(`a`->?->>?)::text::bigint');
        expect(sql.bindings).to.eql(['b', 'c']);
    });
});
