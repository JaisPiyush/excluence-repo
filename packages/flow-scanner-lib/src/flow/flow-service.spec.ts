import { expect } from 'chai';
import { FlowService } from './flow-service';
import { TicketThrottler } from '../helpers/ticket-throttler';
import { MockFlowClient, blockNumbers } from '../mocks/mock-flow-client';
import { getAllEventsForBlock } from '../mocks/mock-fixtures';

describe('Flow service tests', () => {
  it('Check that block height rate limit is respected', async () => {
    let ticketCount = 0;
    const throttler = new TicketThrottler(
      100,
      100,
      (count) => (ticketCount += count)
    );
    const mockFlowClient = new MockFlowClient();
    const flowService = new FlowService(mockFlowClient, () => throttler);
    const NUM_REQUESTS = 20;

    for (let i = 0; i < NUM_REQUESTS; ++i) {
      await flowService.getLatestBlock();
    }

    expect(ticketCount).equals(NUM_REQUESTS);
  });

  it('Check getEvents is returning all event from the block', async () => {
    let ticketCount = 0;
    const throttler = new TicketThrottler(
      100,
      100,
      (count) => (ticketCount += count)
    );
    const mockFlowClient = new MockFlowClient();
    const flowService = new FlowService(mockFlowClient, () => throttler);
    const expectedEvents = getAllEventsForBlock(Number(blockNumbers[0]));
    const events = await flowService.getEvents(Number(blockNumbers[0]));

    expect(events).to.deep.equals(expectedEvents);
  });
});
