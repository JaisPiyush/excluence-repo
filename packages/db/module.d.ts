import { Knex } from 'knex';
import { ScannerBlockConfig } from './src/types';

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
        scannerBlockConfig: ScannerBlockConfig;
        scannerBlockConfig_composite: Knex.CompositeTableType<
            ScannerBlockConfig,
            ScannerBlockConfig,
            Pick<ScannerBlockConfig, "currentBlockHeight">,
            null
        >;
    }
}
