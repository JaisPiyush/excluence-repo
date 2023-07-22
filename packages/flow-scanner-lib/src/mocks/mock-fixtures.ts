import { FlowBlock, FlowCollection, FlowTransactionStatus } from 'flow-client';
import { FlowFetchedEvent } from '../model/flow-fetched-event';

export const blocks: Record<number, FlowBlock> = {
    57110423: {
        id: '799f5be8d0d6b0d0d13ec8c4a2161f276038e793c8376fc2394f9ed8928b4474',
        height: 57110423,
        timestamp: '2023-07-20T20:01:17.331512678Z',
        collectionGuarantees: [
            {
                collectionId:
                    '34581ddb486593ff3ac421afb818e7a4040c4a0016f21986a97a292356b52d55'
            },
            {
                collectionId:
                    'a4c40374e2a5a794914e8f37a569cbb526305a419fd31fbb4fb3bc80c8eefe19'
            },
            {
                collectionId:
                    'f5f046f7479b865e14b3232b3bfe26ee953d1c4e8fd4aac63f90203e6fdb9fe8'
            }
        ]
    },
    57110424: {
        id: '8b2597d47cac625e5cd12c5f3ee8e59953faa74a779967e4cbf8fda70b2f14d5',
        parentId:
            '799f5be8d0d6b0d0d13ec8c4a2161f276038e793c8376fc2394f9ed8928b4474',
        height: 57110424,
        timestamp: '2023-07-20T20:01:18.491899242Z',
        collectionGuarantees: [
            {
                collectionId:
                    '4c249739b851158a74b7d7b6b89f3f796767368d9af966fc76cd517b5d0d9246'
            },
            {
                collectionId:
                    '8b5ec05df6233c9e31ac0e061a0eba75dec01b131aa8f070345c9060fab2b7f7'
            },
            {
                collectionId:
                    'fb1e6e940d28dda538ccbed8f5f4eb15f85b0632d5ff36effc03a02a87140472'
            }
        ],
        blockSeals: [
            {
                blockId:
                    '1eef62070bc5ba70db5558fcf2a8ffed1e7c4a4a34635e872e08bcf9958426b2',
                executionReceiptId:
                    'd7ec1446c09888bab22167c52b2191971b4fb4402fd5fb4c7c1e888949215b7d'
            },
            {
                blockId:
                    '634b5b3a074737ee6e15ef451183b7096bd5d1f347e01e4e78f57a9655b384d0',
                executionReceiptId:
                    'dcf107820c2b85b0779a2ceb6772a486d08ac94d89962341ee5213e36a89d91b'
            }
        ]
    }
};

export const collections: Record<string, FlowCollection> = {
    '34581ddb486593ff3ac421afb818e7a4040c4a0016f21986a97a292356b52d55': {
        id: '34581ddb486593ff3ac421afb818e7a4040c4a0016f21986a97a292356b52d55',
        transactionIds: [
            'd86cec7f28082421136b724b853e4faf416d47c6e61aa8e2be526ac7fd72bde7'
        ]
    },
    a4c40374e2a5a794914e8f37a569cbb526305a419fd31fbb4fb3bc80c8eefe19: {
        id: 'a4c40374e2a5a794914e8f37a569cbb526305a419fd31fbb4fb3bc80c8eefe19',
        transactionIds: [
            '27b9cad51f0243b62b809d26abfe82dacb090a5e2a4bc7e14c38f3e5f7e83b00'
        ]
    },
    f5f046f7479b865e14b3232b3bfe26ee953d1c4e8fd4aac63f90203e6fdb9fe8: {
        id: 'f5f046f7479b865e14b3232b3bfe26ee953d1c4e8fd4aac63f90203e6fdb9fe8',
        transactionIds: [
            'db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424'
        ]
    },
    '4c249739b851158a74b7d7b6b89f3f796767368d9af966fc76cd517b5d0d9246': {
        id: '4c249739b851158a74b7d7b6b89f3f796767368d9af966fc76cd517b5d0d9246',
        transactionIds: [
            'e91fb59856400c82ebd2900de716b359a12eb497fb776089e800792bfaef564a'
        ]
    },
    '8b5ec05df6233c9e31ac0e061a0eba75dec01b131aa8f070345c9060fab2b7f7': {
        id: '8b5ec05df6233c9e31ac0e061a0eba75dec01b131aa8f070345c9060fab2b7f7',
        transactionIds: [
            '8be8b6c88104f943610cf4099303316776141c395f61d2f6bd61f82a1a7e52cc'
        ]
    },
    fb1e6e940d28dda538ccbed8f5f4eb15f85b0632d5ff36effc03a02a87140472: {
        id: 'fb1e6e940d28dda538ccbed8f5f4eb15f85b0632d5ff36effc03a02a87140472',
        transactionIds: [
            '7f6053309dccc467fe71a746c5a1db1f0e10d74156ce253e6221415de0247349',
            '6d1650a1420ae3cd9dde1a42cf3e54ed9c9ea90ce9c34b007e6e0efa053a0ce1'
        ]
    }
};

export const txns: Record<string, FlowTransactionStatus> = {
    d86cec7f28082421136b724b853e4faf416d47c6e61aa8e2be526ac7fd72bde7: {
        blockId:
            '799f5be8d0d6b0d0d13ec8c4a2161f276038e793c8376fc2394f9ed8928b4474',
        status: 4,
        statusString: 'SEALED',
        statusCode: 1,
        errorMessage:
            '[Error Code: 1007] error caused by: 1 error occurred:\\n\\t* checking sequence number failed: [Error Code: 1007] invalid proposal key: public key 0 on account 6a587be304c1224c has sequence number 1573480, but given 1573479\\n\\n',
        events: []
    },
    '27b9cad51f0243b62b809d26abfe82dacb090a5e2a4bc7e14c38f3e5f7e83b00': {
        blockId:
            '799f5be8d0d6b0d0d13ec8c4a2161f276038e793c8376fc2394f9ed8928b4474',
        status: 4,
        statusString: 'SEALED',
        statusCode: 0,
        errorMessage: '',
        events: [
            {
                type: 'A.1654653399040a61.FlowToken.TokensWithdrawn',
                transactionId:
                    '27b9cad51f0243b62b809d26abfe82dacb090a5e2a4bc7e14c38f3e5f7e83b00',
                transactionIndex: 1,
                eventIndex: 0,
                data: { amount: '0.00000100', from: '0x18eb4ee6b3c026d2' }
            },
            {
                type: 'A.1654653399040a61.FlowToken.TokensDeposited',
                transactionId:
                    '27b9cad51f0243b62b809d26abfe82dacb090a5e2a4bc7e14c38f3e5f7e83b00',
                transactionIndex: 1,
                eventIndex: 1,
                data: { amount: '0.00000100', to: '0xf919ee77447b7497' }
            },
            {
                type: 'A.f919ee77447b7497.FlowFees.FeesDeducted',
                transactionId:
                    '27b9cad51f0243b62b809d26abfe82dacb090a5e2a4bc7e14c38f3e5f7e83b00',
                transactionIndex: 1,
                eventIndex: 2,
                data: {
                    amount: '0.00000100',
                    inclusionEffort: '1.00000000',
                    executionEffort: '0.00000000'
                }
            }
        ]
    },
    db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424: {
        blockId:
            '799f5be8d0d6b0d0d13ec8c4a2161f276038e793c8376fc2394f9ed8928b4474',
        status: 4,
        statusString: 'SEALED',
        statusCode: 0,
        errorMessage: '',
        events: [
            {
                type: 'A.1e3c78c6d580273b.LNVCT.Withdraw',
                transactionId:
                    'db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424',
                transactionIndex: 2,
                eventIndex: 0,
                data: { id: '125764308943568897', from: '0x1e3c78c6d580273b' }
            },
            {
                type: 'A.1e3c78c6d580273b.LNVCT.Deposit',
                transactionId:
                    'db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424',
                transactionIndex: 2,
                eventIndex: 1,
                data: { id: '125764308943568897', to: '0xb260a021d24fa986' }
            },
            {
                type: 'A.1654653399040a61.FlowToken.TokensWithdrawn',
                transactionId:
                    'db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424',
                transactionIndex: 2,
                eventIndex: 2,
                data: { amount: '0.00000858', from: '0x1e3c78c6d580273b' }
            },
            {
                type: 'A.1654653399040a61.FlowToken.TokensDeposited',
                transactionId:
                    'db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424',
                transactionIndex: 2,
                eventIndex: 3,
                data: { amount: '0.00000858', to: '0xf919ee77447b7497' }
            },
            {
                type: 'A.f919ee77447b7497.FlowFees.FeesDeducted',
                transactionId:
                    'db72e68673e7c632916b9648b8aabecd1f7b8eebd3fe1ed0d90ffc8c43afb424',
                transactionIndex: 2,
                eventIndex: 4,
                data: {
                    amount: '0.00000858',
                    inclusionEffort: '1.00000000',
                    executionEffort: '0.00000152'
                }
            }
        ]
    }
};

export function getAllEventsForBlock(height: number): FlowFetchedEvent[] {
    const block = blocks[height];
    if (!block) return [];
    let events: FlowFetchedEvent[] = [];
    for (const collection of block.collectionGuarantees) {
        for (const txnId of collections[collection.collectionId]
            .transactionIds) {
            const txn = txns[txnId];
            if (txn) {
                events = events.concat(
                    txn.events.map((event) => {
                        return {
                            block: {
                                timestamp: block.timestamp,
                                height: block.height,
                                id: block.id
                            },
                            collectionId: collection.collectionId,
                            ...event
                        };
                    })
                );
            }
        }
    }
    return events;
}
