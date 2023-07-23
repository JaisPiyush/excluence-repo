import { Knex } from 'knex';
import { flowEventsTableName } from '../constants';

export async function isEventInDatabase(
    knex: Knex,
    transactionId: string,
    eventIndex: number
): Promise<boolean> {
    const event = await knex
        .table(flowEventsTableName)
        .where({ transactionId, eventIndex: BigInt(eventIndex) })
        .first('transactionId', 'eventIndex');
    return event !== undefined;
}
