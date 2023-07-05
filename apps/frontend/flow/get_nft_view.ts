import * as fcl from "@onflow/fcl";
import { replaceAddress } from "./utils";
import GET_NFT_VIEW from "@excluence-repo/flow/scripts/nft/get_nft_view.cdc";
import { FlowPath, NFTView } from "@/utility/types";

export async function fetchNFTView(address: string, collectionPublicPath: FlowPath, id: string) {

    const nftView =  await fcl.query({
        cadence: replaceAddress(GET_NFT_VIEW),
        args: (arg,t) => [
            arg(address, t.Address),
            arg(collectionPublicPath.identifier, t.String),
            arg(id, t.UInt64)
        ]
    }) as NFTView;
    return nftView;
}