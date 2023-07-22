import { Knex } from 'knex';
import { tableName } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(tableName, function (table) {
        table.string('address').notNullable();
        table.string('contractName').notNullable();
        table.string('contract').notNullable();
        table.string('event').notNullable();
        table.string('eventName').notNullable();
        table.dateTime('timestamp').notNullable();
        table.string('collectionId').notNullable();
        table.string('transactionId').notNullable();
        table.bigInteger('eventIndex').notNullable();
        table.string('blockId').notNullable();
        table.bigInteger('blockHeight').notNullable();
        table.jsonb('payload').notNullable();

        table.primary(['transactionId', 'eventIndex']);
        // Index to find by address, contractName, event
        table.index(
            ['address', 'contractName', 'eventName'],
            'idx_address_contractName_eventName',
            {
                storageEngineIndexType: 'hash'
            }
        );

        // Index for complete event name
        table.index(['event'], 'idx_event', {
            storageEngineIndexType: 'hash'
        });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.table(tableName).del();
}
