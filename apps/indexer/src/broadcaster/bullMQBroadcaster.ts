import { FlowFetchedEvent } from 'flow-scanner-lib';
import { EventBroadcasterInterface } from 'flow-scanner-lib/src/broadcaster/event-broadcaster';
import { Logger } from 'logger';
import { Queue, CreateEventJob } from 'steward';

export class BullMQEventBroadcaster implements EventBroadcasterInterface {
    constructor(private readonly queue: Queue) {}

    broadcastEvents = async (
        blockHeight: number,
        events: FlowFetchedEvent[]
    ) => {
        Logger.info(`Indexing block: ${blockHeight}`);
        for (const event of events) {
            const name = Date.now().toString();
            await this.queue.add(
                name,
                new CreateEventJob(event as any as Record<string, unknown>)
            );
        }
    };
}
