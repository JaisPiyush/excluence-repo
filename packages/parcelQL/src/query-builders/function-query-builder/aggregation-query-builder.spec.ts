import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { AggregationQueryBuilder } from './aggregation-query-builder';
import { ParcelQLSimpleColumnWithCase } from '../../schema';

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

    // Test function validation
    it('should throw validation error on function', () => {
        expect(() => {
            new AggregationQueryBuilder({ function: 'TIME' } as any, {
                column: 'a'
            });
        }).to.throw('function "TIME" is not supported.');
    });
    // Test with * as column value
    it('should pass with "*" as column', () => {
        const builder = new AggregationQueryBuilder(
            { function: 'COUNT' },
            { column: '*' }
        );
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('COUNT(*)');
    });
    // Test with named column value
    it('should pass with names as column', () => {
        const builder = new AggregationQueryBuilder(
            { function: 'COUNT' },
            { column: 'a' }
        );
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('COUNT(`a`)');
    });
    // Test with other parameters
    it('should pass with names as column with parameters', () => {
        const builder = new AggregationQueryBuilder(
            { function: 'COUNT', parameters: [1, 0] },
            { column: 'a' }
        );
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('COUNT(`a`,?,?)');
        expect(sql.bindings).to.eql([1, 0]);
    });
    // Test with case-when
    it('should work with case-when', () => {
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
        const builder = new AggregationQueryBuilder({ function: 'COUNT' }, col);
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'COUNT(CASE WHEN `a` > ? THEN `salePrice` ELSE ? END)'
        );
        expect(sql.bindings).to.eql([2, null]);
    });
});
