import { assert, expect } from 'chai';
import { EventBus } from '../event-bus/event-bus';
import { MockFlowClient, blockNumbers } from '../mocks/mock-flow-client';
import { FlowService } from '../flow/flow-service';
import { FlowFetchedEvent } from '../model/flow-fetched-event';
import { EventBroadcasterInterface } from '../broadcaster/event-broadcaster';
import { FlowScanner } from './flow-scanner';
import { nullLogProvider } from '../providers/log-provider';
import { nullMetricServiceProvider } from '../providers/metric-service-provider';
import { blocks, getAllEventsForBlock } from '../mocks/mock-fixtures';
import { FlowScannerConfig } from '../config/flow-scanner-config';
import { SettingsServiceInterface } from '../settings/settings-service';
import { EventPayloads, EventType } from '../event-bus/events';
import { delay } from '../helpers/delay';

const testConfig: FlowScannerConfig = {
  defaultStartBlockHeight: Number(blockNumbers[0]),
  flowAccessNode: '',
  maxFlowRequestsPerSecond: 10
};

describe('Test flow scanner', () => {
  it('test broadcasting of events', async () => {
    const eventBus = new EventBus();
    const mockFlowClient = new MockFlowClient();
    const flowService = new FlowService(mockFlowClient);
    const broadcasts: { blockHeight: number; events: FlowFetchedEvent[] }[] =
      [];

    const eventBroadcaster: EventBroadcasterInterface = {
      broadcastEvents: async (
        blockHeight: number,
        events: FlowFetchedEvent[]
      ) => {
        broadcasts.push({ blockHeight, events });
      }
    };

    let storedProcessedBlockHeight = 0;

    const settingsProvider: SettingsServiceInterface = {
      getProcessedBlockHeight: async () => {
        return storedProcessedBlockHeight;
      },
      setProcessedBlockHeight: async (blockHeight: number) => {
        storedProcessedBlockHeight = blockHeight;
      }
    };

    const flowScanner = new FlowScanner({
      eventBusProvider: () => eventBus,
      logProvider: nullLogProvider,
      metricServiceProvider: nullMetricServiceProvider,
      flowServiceProvider: async () => flowService,
      eventBroadcasterProvider: async () => eventBroadcaster,
      configProvider: () => testConfig,
      settingsServiceProvider: async () => settingsProvider
    });

    const fetches: EventPayloads.FlowEventsFetched[] = [];
    let processedBlockHeight = 0;

    eventBus.addRemovableListener<EventPayloads.FlowEventsFetched>(
      EventType.FlowEventsFetched,
      (ev) => fetches.push(ev)
    );
    eventBus.addRemovableListener<EventPayloads.ProcessedBlockHeightUpdated>(
      EventType.ProcessedBlockHeightUpdated,
      (ev) => {
        processedBlockHeight = ev.blockHeight;
      }
    );

    await flowScanner.start();

    const startTime = new Date().getTime();
    // wait for a bit to see if we receive events
    while (broadcasts.length < Object.values(blocks).length - 1) {
      await delay(10);

      if (new Date().getTime() - startTime > 2000) {
        assert(false, 'Flow scanner timed out processing events');
        break;
      }
    }

    await flowScanner.stop();
    for (const broadcast of broadcasts) {
      const testBlock = mockFlowClient.getBlockAtHeight(
        broadcast.blockHeight - 1
      );
      expect(testBlock).not.undefined;
      expect(broadcast.events).length(
        getAllEventsForBlock(processedBlockHeight).length
      );
    }
  });
});
