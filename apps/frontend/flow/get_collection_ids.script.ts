import * as fcl from "@onflow/fcl"
import GET_COLLECTION_IDS from "@excluence-repo/flow/scripts/nft/get_collection_ids.cdc";
import { FlowPath } from "@/utility/types";
import { replaceAddress } from "./utils";

export async function fetchAllCollectionIds(addr: string, collectionPublicPath: FlowPath) {
    
    console.log(addr, collectionPublicPath)
    
    return await fcl.query({
        cadence: replaceAddress(GET_COLLECTION_IDS),
        args: (arg, t) => [
            arg(addr, t.Address),
            arg(collectionPublicPath.identifier, t.String)
        ]
    }) as string[];
}