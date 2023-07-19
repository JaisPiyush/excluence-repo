export interface SignableObject {
    address: string;
    keyId: number;
    signature: string;
}

export interface ProposalKeyObject {
    address: string;
    keyId: number;
    sequenceNumber: number;
}

export interface FlowTransactionObject {
    args: object;
    authorizers: string[];
    envelopeSignatures: SignableObject[];
    gasLimit: number;
    payer: string;
    payloadSignatures: SignableObject[];
    proposalKey: ProposalKeyObject;
    script: string;
}


export interface FlowEvent {
    type: string;
    transactionId: string;
    transactionIndex: number;
    eventIndex: number;
    data: object
}

export interface FlowTransactionStatus {
    blockId: string;
    status: number;
    statusString: string;
    statusCode: number;
    errorMessage: string;
    events: FlowEvent[]
}