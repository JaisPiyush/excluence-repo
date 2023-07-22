import { Knex } from 'knex';
import { tableName } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    knex.schema.withSchema('public').createTable(tableName, function (table) {
        table.string('address');
        table.string('contractName');
        table.string('contract');
        table.string('event');
        table.string('eventName');
        table.dateTime('timestamp');
        table.string('collectionId');
        table.string('transactionId');
        table.string('blockId');
        table.bigInteger('blockHeight');
        table.jsonb('payload');

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
