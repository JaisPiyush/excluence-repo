export interface CollectionGuaranteesObject {
  collectionId: string;
  signerIds?: unknown[];
}

export interface BlockSealObject {
  blockId: string;
  executionReceiptId: string;
}

export type FlowBlock = {
  id: string;
  parentId: string;
  height: number;
  timestamp: string;
  collectionGuarantees: CollectionGuaranteesObject[];
  blockSeals: BlockSealObject[];
};
