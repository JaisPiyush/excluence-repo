import { FlowFetchedEvent } from '../model/flow-fetched-event';

export type EventBroadcast = {
    blockHeight: number;
    events: FlowFetchedEvent[];
};

export interface EventBroadcasterInterface {
    broadcastEvents: (
        blockHeight: number,
        events: FlowFetchedEvent[]
    ) => Promise<void>;

    destroy?: () => Promise<void>;
}
