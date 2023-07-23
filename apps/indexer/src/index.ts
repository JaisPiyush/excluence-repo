import { FlowScanner } from 'flow-scanner-lib';
import { ConfigProvider } from 'flow-scanner-lib/src/providers/config-provider';
import { Logger } from 'logger';
import { ExcluenceDBSettingsService } from './settings/excluence-db-settings-service';
import { connectDB } from '@excluence-repo/db';
import { connection } from './connection';
import { BullMQEventBroadcaster } from './broadcaster/bullMQBroadcaster';
import { eventQueue, eventQueueName } from './queue';
import { setupBullMQProcess } from 'steward';
import { logger } from './logger';

// const flowNetwork = process.env['NEXT_PUBLIC_FLOW_NETWORK'];
const flowNetworkAPI = process.env['NEXT_PUBLIC_FLOW_ACCESS_NODE'] as string;

const configProvider: ConfigProvider = () => ({
    defaultStartBlockHeight: 57300887,
    flowAccessNode: flowNetworkAPI,
    maxFlowRequestsPerSecond: 5
});

export const main = async () => {
    const knex = connectDB(connection);
    const scannerId = 'event-indexer';
    const settingService = new ExcluenceDBSettingsService(knex, scannerId);

    const eventBroadcaster = new BullMQEventBroadcaster(eventQueue);

    const flowScanner = new FlowScanner({
        configProvider,
        eventBroadcasterProvider: async () => eventBroadcaster,
        settingsServiceProvider: async () => settingService,
        logProvider: logger
    });
    await settingService.initScannerConfig(
        configProvider().defaultStartBlockHeight
    );
    const worker = await setupBullMQProcess(eventQueueName, knex);
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
    await worker.close();
    await knex.destroy();
    process.exit(0);
};

main();
