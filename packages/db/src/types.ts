export interface FlowEvents {
    // 0x{address}
    address: string;
    contractName: string;
    // contract complete address A.{user_address}.{contract_name}
    contract: string;
    // Complete event address A.{user_address}.{contract_name}.{event_name}
    event: string;
    eventName: string;
    // block timestamp
    timestamp: string | Date;
    collectionId: string;
    transactionId: string;
    eventIndex: number;
    blockId: string;
    blockHeight: number | bigint | string;
    payload: Record<string, unknown>;
}

export interface ScannerBlockConfig {
    scannerId: string;
    currentBlockHeight: number | bigint | string;
    startBlockHeight: number | bigint | string;
}
