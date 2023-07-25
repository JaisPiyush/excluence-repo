import { expect } from 'chai';
import _knex, { Knex } from 'knex';
import { JoinBuilder } from './join-builder';

describe('Test JoinBuilder', () => {
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

    // Test invalid join type
    it('should throw error on invalid join type', () => {
        expect(() => {
            new JoinBuilder({
                type: 'Q' as any,
                on: {
                    column: 'a',
                    operator: 'IN',
                    rightColumn: {
                        column: 'ar'
                    }
                },
                table: 's'
            });
        }).to.throw('invalid join type');
    });
    // Test invalid table action
    it('should throw invalid table action', () => {
        expect(() => {
            new JoinBuilder({
                type: 'INNER',
                on: {
                    column: 'a',
                    operator: 'IN',
                    rightColumn: {
                        column: 'ar'
                    }
                },
                table: {
                    action: 'query'
                } as any
            });
        }).to.throw(
            'only temporary table action supported in joins and alias is required for temporary table'
        );
    });
    // Test query table without alias
    it('should throw error for query table without alias', () => {
        expect(() => {
            new JoinBuilder({
                type: 'INNER',
                on: {
                    column: 'a',
                    operator: 'IN',
                    rightColumn: {
                        column: 'ar'
                    }
                },
                table: {
                    action: 'temporary_table',
                    columns: [{ column: 'm' }],
                    table: 'table_4'
                }
            } as any);
        }).to.throw(
            'only temporary table action supported in joins and alias is required for temporary table'
        );
    });
    // Test normal join
    it('should pass on table as string join', () => {
        const builder = new JoinBuilder({
            type: 'INNER',
            on: {
                column: 'table_4.name',
                operator: 'IN',
                rightColumn: {
                    column: 'ar.name'
                }
            },
            table: 'table_4'
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'INNER JOIN `table_4` ON (`table_4`.`name` IN `ar`.`name`)'
        );
    });
    // Test normal join with alias
    it('should pass on table as string join', () => {
        const builder = new JoinBuilder({
            type: 'INNER',
            on: {
                column: 'n.name',
                operator: 'IN',
                rightColumn: {
                    column: 'ar.name'
                }
            },
            table: {
                action: 'temporary_table',
                columns: [{ column: 'm' }],
                table: 'table_4'
            },
            alias: 'n'
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'INNER JOIN (select `m` from `table_4`) `n` ON (`n`.`name` IN `ar`.`name`)'
        );
    });
    // Test query join with alias
    it('should pass on table as string join', () => {
        const builder = new JoinBuilder({
            type: 'INNER',
            on: {
                column: 'n.name',
                operator: 'IN',
                rightColumn: {
                    column: 'ar.name'
                }
            },
            table: 'table_4',
            alias: 'n'
        });
        const sql = builder.build(knex).toSQL();
        expect(sql.sql).to.eq(
            'INNER JOIN `table_4` `n` ON (`n`.`name` IN `ar`.`name`)'
        );
    });
});
