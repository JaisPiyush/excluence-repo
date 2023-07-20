import { FlowRateLimiterProvider } from '../providers/flow-rate-limiter-provider';
import { FlowBlock, FlowCollection, FlowTransactionStatus } from 'flow-client';
import { FlowClientInterface } from 'flow-client';

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
}
