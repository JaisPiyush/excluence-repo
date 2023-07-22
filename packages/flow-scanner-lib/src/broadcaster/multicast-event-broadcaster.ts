import { EventBroadcasterInterface } from './event-broadcaster';
import { EventBroadcasterProvider } from '../providers/event-broadcaster-provider';
import { LogProvider } from '../providers/log-provider';
import { FlowFetchedEvent } from '../model/flow-fetched-event';

export class MulticastEventBroadcaster implements EventBroadcasterInterface {
    constructor(
        private readonly broadcasterProviders: EventBroadcasterProvider[],
        private readonly logProvider: LogProvider
    ) {}

    broadcastEvents = async (
        blockHeight: number,
        events: FlowFetchedEvent[]
    ) => {
        try {
            const promises: Promise<any>[] = [];

            for (const broadcasterProvider of this.broadcasterProviders) {
                promises.push(
                    (await broadcasterProvider()).broadcastEvents(
                        blockHeight,
                        events
                    )
                );
            }

            Promise.allSettled(promises);
        } catch (err) {
            this.logProvider().error(err);
        }
    };

    destroy = async () => {
        for (const broadcasterProvider of this.broadcasterProviders) {
            const broadcaster = await broadcasterProvider();
            broadcaster.destroy && (await broadcaster.destroy());
        }
    };
}
