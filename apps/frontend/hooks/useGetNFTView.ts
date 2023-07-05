import { fetchNFTView } from "@/flow/get_nft_view";
import { CollectionOnServer, NFTCollectionData, NFTViewWithContractData } from "@/utility/types";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl"
import { getCollectionData } from "@/flow/get_collection_data.script";
import { fetchAllNFTs } from "@/flow/nft";

export const useGetNFTView = (collection: CollectionOnServer, ids: string[], address?: string, collectionData?: NFTCollectionData,) => {
    const [nfts, setNFTs] = useState<NFTViewWithContractData[]>([]);
    const [hasFetchedNFT, setHasFetchedNFT] = useState(false);

    useEffect(() => {
        if (collection.address && collection.contractName && ids.length > 0 && !hasFetchedNFT) {
            fetchAllNFTs(
                collection,
                ids,
                address,
                collectionData
            ).then((nfts) => {
                setHasFetchedNFT(true)
                setNFTs([...nfts])
            })
        }
    },[collection.address, collection.contractName, ids, hasFetchedNFT, address, collection, collectionData])

    return nfts;
}