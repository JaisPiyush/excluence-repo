/* eslint-disable @typescript-eslint/no-unused-vars */
import { Job } from 'bullmq';
import { Logger } from 'logger';
import { Knex } from 'knex';
import { FlowFetchedEvent } from 'flow-scanner-lib';

export interface JobImp {
    name: string;
    payload?: Record<string, unknown>;
    handle: (knex: Knex, job?: Job) => Promise<void>;
    failed: (job?: Job) => Promise<void>;
}

export class BaseJob {
    readonly name: string = this.constructor.name;

    handle = async (knex: Knex, job?: Job<FlowFetchedEvent>): Promise<void> => {
        throw new Error('Method not implemented');
    };

    // Callback when job is failed
    failed = async (job?: Job): Promise<void> => {
        Logger.error(`Job(${this.name}) with ID: ${job?.id} has failed`);
    };
}
