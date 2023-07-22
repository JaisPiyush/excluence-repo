import { Knex } from 'knex';

declare module 'knex/types/tables' {
    interface FlowEvents {
        // 0x{address}
        address: string;
        contractName: string;
        // contract complete address A.{user_address}.{contract_name}
        contract: string;
        // Complete event address A.{user_address}.{contract_name}.{event_name}
        event: string;
        eventName: string;
        // block timestamp
        timestamp: string | Date;
        collectionId: string;
        transactionId: string;
        eventIndex: number;
        blockId: string;
        blockHeight: number | bigint;
        payload: Record<string, unknown>;
    }
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
