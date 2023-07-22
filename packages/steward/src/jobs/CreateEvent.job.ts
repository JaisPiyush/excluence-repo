import { FlowFetchedEvent } from 'flow-scanner-lib';
import { BaseJob, JobImp } from './job.definition';
import { Logger } from 'logger';
import { Knex, createEvent } from '@excluence-repo/db';
import {
    getAddressOnly,
    getContractId,
    getContractNameOnly,
    getEventTypeOnly
} from '../utils';
import { Job } from 'bullmq';

export class CreateEventJob extends BaseJob implements JobImp {
    constructor(public payload: Record<string, unknown>) {
        super();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    handle = async (knex: Knex, job?: Job<FlowFetchedEvent>): Promise<void> => {
        try {
            const data = this.payload as any as FlowFetchedEvent;
            Logger.info(
                `Indexing event ${data.type} in transaction ${data.transactionIndex}`
            );
            await createEvent(knex, {
                address: getAddressOnly(data.type),
                contractName: getContractNameOnly(data.type),
                contract: getContractId(data.type),
                event: data.type,
                eventName: getEventTypeOnly(data.type),
                timestamp: data.block.timestamp as string,
                collectionId: data.collectionId,
                transactionId: data.transactionId,
                eventIndex: data.transactionIndex,
                blockId: data.block.id as string,
                blockHeight: data.block.height as number,
                payload: data.data as Record<string, unknown>
            });
            Logger.info(
                `Indexed event ${data.type} in transaction ${data.transactionIndex}`
            );
        } catch (e) {
            Logger.error(`${this.name}: ${e}`);
        }
    };
}
