import { FlowFetchedEvent } from '../model/flow-fetched-event';

export enum EventType {
  LatestBlockHeightUpdated = 'LatestBlockHeightUpdated',
  ProcessedBlockHeightUpdated = 'ProcessedBlockHeightUpdated',
  FlowEventsFetched = 'FlowEventsFetched'
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace EventPayloads {
  export type LatestBlockHeightUpdated = {
    blockHeight: number;
  };

  export type ProcessedBlockHeightUpdated = {
    blockHeight: number;
  };

  export type FlowEventsFetched = {
    blockHeight: number;
    events: FlowFetchedEvent[];
  };
}
