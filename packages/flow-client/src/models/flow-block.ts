export interface CollectionGuaranteesObject {
  collectionId: string;
  signerIds?: unknown[];
}

export type FlowBlock = {
  id: string;
  height: number;
  timestamp: string;
  collectionGuarantees: CollectionGuaranteesObject[];
};
