import { Knex } from 'knex';
import { scannerBlockConfigTableName } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(
        scannerBlockConfigTableName,
        function (table) {
            table.string('scannerId').primary();
            table.bigInteger('currentBlockHeight').notNullable();
            table.bigInteger('startBlockHeight').notNullable();
        }
    );
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(scannerBlockConfigTableName);
}
