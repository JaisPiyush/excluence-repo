import { FlowFetchedEvent, FlowScanner } from 'flow-scanner-lib';
import { ConfigProvider } from 'flow-scanner-lib/src/providers/config-provider';
import { MemorySettingsService } from 'flow-scanner-lib/src/settings/memory-settings-service';
import { EventBroadcasterInterface } from 'flow-scanner-lib/src/broadcaster/event-broadcaster';
import { Logger } from 'logger';
// import { connectDB } from '@excluence-repo/db';
// import { connection } from './connection';

// const flowNetwork = process.env['NEXT_PUBLIC_FLOW_NETWORK'];
const flowNetworkAPI = process.env['NEXT_PUBLIC_FLOW_ACCESS_NODE'] as string;

const configProvider: ConfigProvider = () => ({
    defaultStartBlockHeight: undefined,
    flowAccessNode: flowNetworkAPI,
    maxFlowRequestsPerSecond: 5
});

const settingService = new MemorySettingsService();

class CustomEventBroadcaster implements EventBroadcasterInterface {
    broadcastEvents = async (
        blockHeight: number,
        events: FlowFetchedEvent[]
    ) => {
        Logger.info(
            `Event at height ${blockHeight} and events ${JSON.stringify(
                events
            )}`
        );
    };
}

const eventBroadcaster = new CustomEventBroadcaster();

export const main = async () => {
    // const knex = connectDB(connection);
    const flowScanner = new FlowScanner({
        configProvider,
        eventBroadcasterProvider: async () => eventBroadcaster,
        settingsServiceProvider: async () => settingService
    });
    await flowScanner.start();

    await new Promise<void>((resolve) => {
        // listen for SIGTERM to stop the scanner
        process.on('SIGTERM', () => {
            Logger.info('Received SIGTERM');
            resolve();
        });

        process.on('SIGINT', () => {
            Logger.info('Received SIGINT');
            resolve();
        });

        process.on('uncaughtException', (e) => {
            Logger.error(e);
            resolve();
        });

        process.on('unhandledRejection', (e) => {
            Logger.error(e);
            resolve();
        });
    });
    Logger.info('Stopping scanner');
    await flowScanner.stop();
};

main();
