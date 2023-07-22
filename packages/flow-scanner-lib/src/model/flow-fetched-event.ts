import { FlowBlock, FlowEvent } from 'flow-client';

export interface FlowFetchedEvent extends FlowEvent {
    block: Omit<FlowBlock, 'collectionGuarantees'>;
    collectionId: string;
}
