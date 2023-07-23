import { Knex } from 'knex';
import { FlowEvents } from '../types';
import { flowEventsTableName } from '../constants';
import { getUTCTime } from '../utils';

// Insert event in the database
export async function createEvent(knex: Knex, event: FlowEvents) {
    if (event.timestamp instanceof String) {
        const datetime = getUTCTime(event.timestamp as string);
        event.timestamp = datetime;
    }
    event.payload = event.payload || {};
    await knex(flowEventsTableName).insert(event);
}
