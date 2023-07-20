export interface CollectionGuaranteesObject {
  collectionId: string;
  signerIds?: unknown[];
}

export type FlowBlock = Record<string, unknown> & {
  id: string;
  height: number;
  timestamp: string;
  collectionGuarantees: CollectionGuaranteesObject[];
};
