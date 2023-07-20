import * as fcl from '@onflow/fcl';
import { FlowBlock } from './models/flow-block';
import { FlowCollection } from './models/flow-collection';
import {
  FlowTransactionObject,
  FlowTransactionStatus
} from './models/flow-transaction';

export interface FlowClientInterface {
  getLatestBlock(): Promise<FlowBlock>;
  getBlockAtHeight(height: number): Promise<FlowBlock>;
  getCollection(collectionId: string): Promise<FlowCollection>;
  getTransactionObject(transactionId: string): Promise<FlowTransactionObject>;
  getTransactionStatus(transactionId: string): Promise<FlowTransactionStatus>;
}

export class FlowClient implements FlowClientInterface {
  constructor(private readonly accessNode: string) {}

  getLatestBlock = async (): Promise<FlowBlock> => {
    const latestBlock = (await fcl
      .send([await fcl.build([fcl.getBlock(true)])], {
        node: this.accessNode
      })
      .then(fcl.decode)) as FlowBlock;
    return latestBlock;
  };

  getBlockAtHeight = async (height: number): Promise<FlowBlock> => {
    const block = (await fcl
      .send(await fcl.build([fcl.getBlock(), fcl.atBlockHeight(height)]), {
        node: this.accessNode
      })
      .then(fcl.decode)) as FlowBlock;
    return block;
  };

  getCollection = async (collectionId: string): Promise<FlowCollection> => {
    const collection = (await fcl
      .send(await fcl.build([fcl.getCollection(collectionId)]), {
        node: this.accessNode
      })
      .then(fcl.decode)) as FlowCollection;
    return collection;
  };

  getTransactionObject = async (
    transactionId: string
  ): Promise<FlowTransactionObject> => {
    const txn = (await fcl
      .send(await fcl.build([fcl.getTransaction(transactionId)]), {
        node: this.accessNode
      })
      .then(fcl.decode)) as FlowTransactionObject;
    return txn;
  };

  getTransactionStatus = async (
    transactionId: string
  ): Promise<FlowTransactionStatus> => {
    const txn = await fcl
      .send(await fcl.build([fcl.getTransactionStatus(transactionId)]), {
        node: this.accessNode
      })
      .then(fcl.decode);
    return txn as FlowTransactionStatus;
  };
}
