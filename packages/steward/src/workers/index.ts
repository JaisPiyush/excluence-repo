/* eslint-disable @typescript-eslint/no-unused-vars */
import { Knex } from '@excluence-repo/db';
import { Job, Worker } from 'bullmq';
import { BaseJob, JobImp, getJobInstance } from '../jobs';
import { isEmpty } from 'lodash';
import { concurrency, connection } from '../config';
import { Logger } from 'logger';

export interface WorkerReply {
    status: number;
    message: string;
}

export const createWorker = (queueName: string, knex: Knex) => {
    const worker = new Worker<JobImp, WorkerReply>(
        queueName,
        async (job: Job) => {
            const instance = getJobInstance(job.data);
            if (isEmpty(instance)) {
                throw new Error(`Unable to find Job: ${job.data.name}`);
            }
            await instance.handle(knex, job);
            return { status: 200, message: 'success' };
        },
        {
            concurrency,
            connection
        }
    );

    worker.on('failed', (job: any, _err: Error, prev: string) => {
        const instance = getJobInstance(job.data);

        if (instance && instance instanceof BaseJob) {
            instance.failed(job).then(() => {});
        }
        Logger.error(`${job.id} has failed`);
    });
    Logger.info(`Started a worker for queue ${queueName} worker: ${worker.id}`);
    return worker;
};
