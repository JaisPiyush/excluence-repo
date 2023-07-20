import { FlowRateLimiterProvider } from '../providers/flow-rate-limiter-provider';
import { FlowBlock, FlowCollection, FlowTransactionStatus } from 'flow-client';
import { FlowClientInterface } from 'flow-client';
import { FlowFetchedEvent } from '../model/flow-fetched-event';

export class FlowService implements FlowClientInterface {
  constructor(
    private readonly flowClient: FlowClientInterface,
    private readonly rateLimiterProvider?: FlowRateLimiterProvider
  ) {}

  getLatestBlock = async (): Promise<FlowBlock> => {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }

    return await this.flowClient.getLatestBlock();
  };

  async getBlockAtHeight(height: number): Promise<FlowBlock> {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }
    return await this.flowClient.getBlockAtHeight(height);
  }

  async getCollection(collectionId: string): Promise<FlowCollection> {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }
    return await this.getCollection(collectionId);
  }
  async getTransactionStatus(txnId: string): Promise<FlowTransactionStatus> {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }
    return await this.getTransactionStatus(txnId);
  }

  async getEvents(blockHeight: number): Promise<FlowFetchedEvent[]> {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }
    const block = await this.flowClient.getBlockAtHeight(blockHeight);
    const collections = await Promise.all(
      block.collectionGuarantees.map(async (collectionGObject) => {
        return await this.flowClient.getCollection(
          collectionGObject.collectionId
        );
      })
    );

    let events: FlowFetchedEvent[] = [];
    for (const collection of collections) {
      for (const txnId of collection.transactionIds) {
        const txn = await this.flowClient.getTransactionStatus(txnId);
        const _events = txn.events.map((event) => {
          return {
            block: {
              id: block.id,
              height: block.height,
              timestamp: block.timestamp
            },
            collectionId: collection.id,
            ...event
          };
        });
        events = events.concat(_events);
      }
    }
    return events;
  }
}
