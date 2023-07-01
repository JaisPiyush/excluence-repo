import * as fcl from "@onflow/fcl"
import GET_COLLECTION_DATA from "@excluence-repo/flow/scripts/nft/get_collection_data.cdc";
import { replaceAddress } from "./utils";
import { NFTCollectionData } from "@/utility/types";

export async function getCollectionData(name: string, addr?: string): Promise<NFTCollectionData> {
    if (!addr) {
        addr = (await fcl.currentUser.snapshot()).addr
    }

    return await fcl.query({
        cadence: replaceAddress(GET_COLLECTION_DATA),
        args: (arg, t) => [
            arg(addr, t.Address),
            arg(name, t.String)
        ]
    }) as NFTCollectionData
}