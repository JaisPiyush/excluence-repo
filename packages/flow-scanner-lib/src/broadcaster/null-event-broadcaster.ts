/* eslint-disable @typescript-eslint/no-unused-vars */
import { EventBroadcasterInterface } from './event-broadcaster';
import { FlowFetchedEvent } from '../model/flow-fetched-event';

export class NullEventBroadcaster implements EventBroadcasterInterface {
  broadcastEvents = async (
    blockHeight: number,
    events: FlowFetchedEvent[]
  ) => {};
}
