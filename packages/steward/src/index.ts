import { Queue } from 'bullmq';
import { connection } from './config';
import { Knex } from '@excluence-repo/db';
import { createWorker } from './workers';

export * from './utils';
export * from './jobs/jobs';
export { Queue };

export const createQueue = (queueName: string) => {
    return new Queue(queueName, { connection });
};

export async function setupBullMQProcess(queueName: string, knex: Knex) {
    return await createWorker(queueName, knex);
}
