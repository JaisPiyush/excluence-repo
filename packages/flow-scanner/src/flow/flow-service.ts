import { FlowRateLimiterProvider } from '../providers/flow-rate-limiter-provider';
import { FlowBlock } from './models/flow-block';
import { FlowClientInterface } from './flow-client';

export class FlowService implements FlowClientInterface {
  constructor(
    private readonly flowClient: FlowClientInterface,
    private readonly rateLimiterProvider?: FlowRateLimiterProvider
  ) {}

  getLatestBlock = async (): Promise<FlowBlock> => {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }

    const latestBlock = await this.flowClient.getLatestBlock();

    return latestBlock;
  };

  async getBlockAtHeight(height: number): Promise<FlowBlock> {
    if (this.rateLimiterProvider) {
      await this.rateLimiterProvider().waitForTickets(1);
    }
    return await this.flowClient.getBlockAtHeight(height);
  }
}
