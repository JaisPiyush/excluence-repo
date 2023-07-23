import { Knex } from 'knex';
import { flowEventsTableName } from '../src/constants';

export async function up(knex: Knex): Promise<void> {
    await knex.schema.createTable(flowEventsTableName, function (table) {
        table.string('address').notNullable();
        table.string('contractName').notNullable();
        table.string('contract').notNullable();
        // Complete event address A.{address without '0x'}.{contractName}.{eventName}
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
        // Index to find by address
        table.index(
            'address',
            'idx_address',
            {
                storageEngineIndexType: 'hash'
            }
        );

        // Index to find by contract A.{address without '0x'}.{contractName}
        table.index(
            'contract',
            'idx_contract',
            {
                storageEngineIndexType: 'hash'
            }
        );

        // Index for complete event name
        table.index('event', 'idx_event', {
            storageEngineIndexType: 'hash'
        });
    });
}

export async function down(knex: Knex): Promise<void> {
    await knex.schema.dropTableIfExists(flowEventsTableName);
}
