import { RemovableListener } from '../event-bus/event-bus';
import { EventBusProvider } from '../providers/event-bus-provider';
import { EventPayloads, EventType } from '../event-bus/events';
import { LogProvider } from '../providers/log-provider';
import { FlowServiceProvider } from '../providers/flow-service-provider';

import { delay } from '../helpers/delay';
import { MetricServiceProvider } from '../providers/metric-service-provider';
import { METRIC_SERVICE_NAME } from './flow-scanner';

const PROCESS_INTERVAL_MS = 50; // how often to run processing loop

type Providers = {
  eventBusProvider: EventBusProvider;
  logProvider: LogProvider;
  flowServiceProvider: FlowServiceProvider;
  metricServiceProvider: MetricServiceProvider;
};

type Options = {
  latestBlockHeight: number | undefined;
  processedBlockHeight: number;
};

export class EventScanner {
  private processTimeout: NodeJS.Timeout | undefined = undefined;
  private running = false;
  private latestBlockHeight: number | undefined;
  private processedBlockHeight: number;
  private fetchedBlockHeight: number | undefined;
  private listeners: RemovableListener[] = [];

  constructor(
    options: Options,
    private readonly providers: Providers
  ) {
    this.latestBlockHeight = options.latestBlockHeight;
    this.processedBlockHeight = options.processedBlockHeight;
    this.fetchedBlockHeight = options.processedBlockHeight;
  }

  start = async () => {
    const eventBus = this.providers.eventBusProvider();

    this.listeners = [
      eventBus.addRemovableListener<EventPayloads.LatestBlockHeightUpdated>(
        EventType.LatestBlockHeightUpdated,
        this.onLatestBlockHeightUpdated
      ),
      eventBus.addRemovableListener<EventPayloads.ProcessedBlockHeightUpdated>(
        EventType.ProcessedBlockHeightUpdated,
        this.onProcessedBlockHeightUpdated
      )
    ];
    this.running = true;
    this.process().then();
  };

  stop = async () => {
    for (const listener of this.listeners) {
      listener.remove();
    }
    this.listeners = [];

    this.running = false;

    if (this.processTimeout) {
      clearTimeout(this.processTimeout);
      this.processTimeout = undefined;
    }
  };

  private onLatestBlockHeightUpdated = (
    ev: EventPayloads.LatestBlockHeightUpdated
  ) => {
    this.latestBlockHeight = ev.blockHeight;
  };

  private onProcessedBlockHeightUpdated = (
    ev: EventPayloads.ProcessedBlockHeightUpdated
  ) => {
    this.processedBlockHeight = ev.blockHeight;
  };

  private process = async () => {
    const logger = this.providers.logProvider();

    if (this.processTimeout) {
      clearTimeout(this.processTimeout);
      this.processTimeout = undefined;
    }

    const startTime = new Date().getTime();

    try {
      if (this.latestBlockHeight) {
        const currentHeight =
          (this.fetchedBlockHeight ?? this.processedBlockHeight) + 1; // find out where we should start this fetch
        const endHeight = this.latestBlockHeight; // try to fetch max blocks
        if (currentHeight <= endHeight) {
          const flowService = await this.providers.flowServiceProvider();
          const eventBus = await this.providers.eventBusProvider();
          let errors = 0;
          let minErrors = 0;

          try {
            logger.debug(`Fetching events from block ${currentHeight}`);
            const startRequestTime = new Date().getTime();
            const events = await flowService.getEvents(currentHeight);
            const endRequestTime = new Date().getTime();

            eventBus.emit<EventPayloads.FlowEventsFetched>(
              EventType.FlowEventsFetched,
              {
                blockHeight: currentHeight,
                events: events
              }
            );
            this.fetchedBlockHeight = currentHeight;

            try {
              const metricService =
                await this.providers.metricServiceProvider();
              metricService.putMetric(
                METRIC_SERVICE_NAME,
                'FlowApiRequests',
                1,
                false,
                false,
                false
              );
              metricService.putMetric(
                METRIC_SERVICE_NAME,
                'FlowFetchedEventRequests',
                1,
                false,
                false,
                false
              );
              metricService.putMetric(
                METRIC_SERVICE_NAME,
                'FlowFetchedEventRequestDuration',
                endRequestTime - startRequestTime,
                true,
                false,
                false
              );
            } catch (err) {
              logger.error(err);
            }
          } catch (err: any) {
            try {
              const metricService =
                await this.providers.metricServiceProvider();
              metricService.putMetric(
                METRIC_SERVICE_NAME,
                'FlowFetchedEventRequestErrors',
                1,
                false,
                false,
                false
              );
            } catch (err) {
              logger.error(err);
            }

            logger.error(
              `Error fetching events from  block ${currentHeight}: ${err}`
            );
            ++errors;
            if (++minErrors > 3) {
              try {
                const metricService =
                  await this.providers.metricServiceProvider();
                metricService.putMetric(
                  METRIC_SERVICE_NAME,
                  'FlowFetchedEventRequestFailures',
                  1,
                  false,
                  false,
                  false
                );
              } catch (err) {
                logger.error(err);
              }

              // we've had repeated errors fetching a single block, error out
              throw err;
            } else {
              // delay on errors fetching single blocks
              await delay(250 * errors + Math.floor(Math.random() * 1000));
            }
          }
        }
      }
    } catch (err) {
      logger.error(err);
    }

    if (this.running) {
      setTimeout(
        () => this.process().then(),
        Math.max(PROCESS_INTERVAL_MS - (new Date().getTime() - startTime), 0)
      );
    }
  };

  __process = async () => {
    await this.process();
  };

  __setProcessedBlockHeight = (blockHeight: number) =>
    (this.processedBlockHeight = blockHeight);
}
