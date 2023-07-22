import { Knex } from 'knex';

declare module 'knex/types/tables' {
    interface Tables {
        flowEvents: FlowEvents;
        flowEvents_composite: Knex.CompositeTableType<
            FlowEvents,
            // Types for `insert()`
            FlowEvents,
            // Types for `update()`
            null,
            null
        >;
    }
}
