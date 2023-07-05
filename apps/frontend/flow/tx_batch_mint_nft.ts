import {TxOpts, tx} from "./utils/tx"
import BATCH_MINT_NFT_TXN from "@excluence-repo/flow/transactions/admin/batch_mint_nft.cdc"
import { getAddressMapWithNFTTemplateTweaked, replaceAddress } from "./utils"
import * as fcl from "@onflow/fcl"
import { BatchNFTArgs } from "@/utility/types";

export async function batchMintNFT(
    args: BatchNFTArgs,
    opts: TxOpts = {}
    ) {
        const address = (await fcl.currentUser.snapshot()).addr;
        const code = BATCH_MINT_NFT_TXN
        const replacementMap = getAddressMapWithNFTTemplateTweaked(address)
        replacementMap['NFTTemplate'] = args.collectionName
        const txnCode = replaceAddress(code, replacementMap);
        const metadata: {key: string, value: string}[] =[];
        for (const [key, value] of Object.entries(args.metadata)) {
            metadata.push({key, value})
        }
        await tx({
            cadence: txnCode,
            args: (arg, t) => [
                arg(address, t.Address),
                arg(args.quantity,t.UInt64),
                arg(args.name, t.String),
                arg(args.description, t.String),
                arg(args.thumbnail, t.String),
                arg(metadata, t.Dictionary({key: t.String, value: t.String}))
            ]
        }, opts)

}