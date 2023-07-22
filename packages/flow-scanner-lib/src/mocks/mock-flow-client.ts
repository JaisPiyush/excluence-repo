import { FlowBlock, FlowCollection, FlowTransactionStatus } from 'flow-client';
import { FlowClientInterface } from 'flow-client';
import { blocks, collections, txns } from './mock-fixtures';

export const blockNumbers = Object.keys(blocks);
export class MockFlowClient implements FlowClientInterface {
    constructor(
        public latestBlockHeight: number = Number(
            blockNumbers[blockNumbers.length - 1]
        ),
        private readonly _blocks: Record<number, FlowBlock> = blocks,
        private readonly _collections: Record<
            string,
            FlowCollection
        > = collections,
        private readonly _txns: Record<string, FlowTransactionStatus> = txns
    ) {}
    async getBlockAtHeight(height: number): Promise<FlowBlock> {
        return this._blocks[height];
    }

    async getCollection(collectionId: string): Promise<FlowCollection> {
        return this._collections[collectionId];
    }

    async getTransactionStatus(txnId: string): Promise<FlowTransactionStatus> {
        return this._txns[txnId];
    }

    getLatestBlock = async (): Promise<FlowBlock> => {
        return this._blocks[this.latestBlockHeight];
    };

    setLatestBlockHeight = (height: number) => {
        this.latestBlockHeight = height;
    };
}
