import { FlowFetchedEvent } from '../model/flow-fetched-event';
import { EventBroadcasterInterface } from './event-broadcaster';

export class ConsoleEventBroadcaster implements EventBroadcasterInterface {
    broadcastEvents = async (
        blockHeight: number,
        events: FlowFetchedEvent[]
    ) => {
        console.log(`Broadcasting ${events.length} events`);
    };
}
