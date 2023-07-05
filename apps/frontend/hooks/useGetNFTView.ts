import { fetchNFTView } from "@/flow/get_nft_view";
import { CollectionOnServer, NFTCollectionData, NFTViewWithContractData } from "@/utility/types";
import { useEffect, useState } from "react";
import * as fcl from "@onflow/fcl"

export const useGetNFTView = (collection: CollectionOnServer, collectionData: NFTCollectionData, ids: number[], address?: string) => {
    const [nfts, setNFTs] = useState<NFTViewWithContractData[]>([]);
    const fetchAllNFTs = async () => {
        address = address || (await fcl.currentUser.snapshot()).addr
        const _nfts =  await Promise.all(ids.map((id) => fetchNFTView(address as string, collectionData.collectionPublicPath, id)))
        setNFTs(_nfts.map((nft) => {
            let nftCollectionView: NFTViewWithContractData = {
                address: collection.address,
                contractName: collection.contractName,
                ...nft
            }
            return nftCollectionView
        }))
    }

    useEffect(() => {
        fetchAllNFTs()
    }, [])

    return nfts;
}