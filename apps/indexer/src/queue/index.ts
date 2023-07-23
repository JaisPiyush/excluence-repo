import { createQueue } from 'steward';

export const eventQueueName = 'event-queue';
export const eventQueue = createQueue(eventQueueName);
