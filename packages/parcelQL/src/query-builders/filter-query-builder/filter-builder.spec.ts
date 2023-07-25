import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { FilterBuilder } from './filter-builder';
import { CompFilter, ParcelQLSubquery } from '../../schema';

describe('Test FilterBuilder', () => {
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

    // Test empty filter should throw error
    it('should throw error due to empty filter', () => {
        expect(() => {
            new FilterBuilder({} as any);
        }).to.throw(
            'insufficient filter or subquery used deeper than root level'
        );
    });
    // Test CompFilter
    it('should pass the normal CompFilter', () => {
        const builder = new FilterBuilder({
            column: 'nftType',
            operator: '>',
            value: 2
        } as CompFilter);
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('(`nftType` > ?)');
        expect(sql.bindings).to.eql([2]);
    });
    // Test AND based filter
    it('should pass AND chained filters', () => {
        const builder = new FilterBuilder({
            and: [
                {
                    column: 'nftType',
                    operator: '>',
                    value: 2
                },
                {
                    column: 'nftType',
                    operator: '<',
                    value: 8
                }
            ]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('((`nftType` > ?) AND (`nftType` < ?))');
        expect(sql.bindings).to.eql([2, 8]);
    });
    // Test OR based filter
    it('should pass OR chained filters', () => {
        const builder = new FilterBuilder({
            or: [
                {
                    column: 'nftType',
                    operator: '>',
                    value: 2
                },
                {
                    column: 'nftType',
                    operator: '<',
                    value: 8
                }
            ]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('((`nftType` > ?) OR (`nftType` < ?))');
        expect(sql.bindings).to.eql([2, 8]);
    });
    // Test deep chained filter
    it('should pass AND-OR  deep-chained filters', () => {
        const builder = new FilterBuilder({
            and: [
                {
                    column: 'nftType',
                    operator: '>',
                    value: 2
                },
                {
                    column: 'nftType',
                    operator: '<',
                    value: 8
                },
                {
                    or: [
                        {
                            column: 'salePrice',
                            operator: '<',
                            value: 10
                        },
                        {
                            column: 'salePrice',
                            operator: '>',
                            value: 30
                        }
                    ]
                }
            ]
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            '((`nftType` > ?) AND (`nftType` < ?) AND ((`salePrice` < ?) OR (`salePrice` > ?)))'
        );
        expect(sql.bindings).to.eql([2, 8, 10, 30]);
    });
    // Test subquery
    it('should PASS with IN subquery', () => {
        const subquery: ParcelQLSubquery = {
            subquery: {
                action: 'subquery',
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
        };
        const builder = new FilterBuilder(subquery);
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq('`film` IN (select * from `table_1`)');
    });
    // Test deep chained subquery should throw error
    it('should fail AND-OR-subquery  deep-chained filters', () => {
        const subquery: ParcelQLSubquery = {
            subquery: {
                action: 'subquery',
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
        };
        expect(() => {
            new FilterBuilder({
                and: [
                    {
                        column: 'nftType',
                        operator: '>',
                        value: 2
                    },
                    {
                        column: 'nftType',
                        operator: '<',
                        value: 8
                    },
                    {
                        or: [
                            {
                                column: 'salePrice',
                                operator: '<',
                                value: 10
                            },
                            {
                                column: 'salePrice',
                                operator: '>',
                                value: 30
                            }
                        ]
                    },
                    subquery
                ]
            });
        }).to.throw(
            'insufficient filter or subquery used deeper than root level'
        );
    });
});
