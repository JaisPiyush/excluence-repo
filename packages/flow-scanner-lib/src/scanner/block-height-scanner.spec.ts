import { expect } from 'chai';
import { EventBus } from '../event-bus/event-bus';
import { MockFlowClient } from '../mocks/mock-flow-client';
import { FlowService } from '../flow/flow-service';
import { BlockHeightScanner } from './block-height-scanner';
import { nullLogProvider } from '../providers/log-provider';
import { nullMetricServiceProvider } from '../providers/metric-service-provider';
import { EventPayloads, EventType } from '../event-bus/events';

describe('Test block height scanner', () => {
  it('Checking  that event is emitted on new block height', async () => {
    const eventBus = new EventBus();
    const mockFlowClient = new MockFlowClient();
    const flowService = new FlowService(mockFlowClient);

    const blockHeightScanner = new BlockHeightScanner({
      eventBusProvider: () => eventBus,
      logProvider: nullLogProvider,
      flowServiceProvider: async () => flowService,
      metricServiceProvider: nullMetricServiceProvider
    });

    let currentBlockHeight: number | undefined = undefined;

    eventBus.addRemovableListener<EventPayloads.LatestBlockHeightUpdated>(
      EventType.LatestBlockHeightUpdated,
      (ev) => {
        currentBlockHeight = ev.blockHeight;
      }
    );

    expect(currentBlockHeight).undefined;
    await blockHeightScanner.__process();
    expect(currentBlockHeight).equals(mockFlowClient.latestBlockHeight);
  });

  it('Checking that event is not emitted on same block height', async () => {
    const eventBus = new EventBus();
    const mockFlowClient = new MockFlowClient();
    const flowService = new FlowService(mockFlowClient);

    const blockHeightScanner = new BlockHeightScanner({
      eventBusProvider: () => eventBus,
      logProvider: nullLogProvider,
      flowServiceProvider: async () => flowService,
      metricServiceProvider: nullMetricServiceProvider
    });

    let eventEmitted = false;

    eventBus.addRemovableListener<EventPayloads.LatestBlockHeightUpdated>(
      EventType.LatestBlockHeightUpdated,
      () => (eventEmitted = true)
    );

    await blockHeightScanner.__process();
    expect(eventEmitted).equals(true);
    eventEmitted = false;
    await blockHeightScanner.__process();
    expect(eventEmitted).equals(false);
  });
});
