import { getAllCollectionByAddress } from "@/api/nftCollection";
import * as fcl from "@onflow/fcl"
import { getCollectionData } from "./get_collection_data.script";
import { fetchAllCollectionIds } from "./get_collection_ids.script";
import { CollectionOnServer, FlowPath, NFTViewWithContractData } from "@/utility/types";
import { fetchNFTView } from "./get_nft_view";

export async function getAllOwnedNFTIds(address?: string) {
    address = address || (await fcl.currentUser.snapshot()).addr 
    const collections = await getAllCollectionByAddress(address as string);
    let fetchCollectionNFTIds: Array<[CollectionOnServer, FlowPath, string]> = []; 
    for (const collection of collections) {
        const collectionData = await getCollectionData(collection.contractName, address);
        const collectionIds = await fetchAllCollectionIds(address as string, collectionData.collectionPublicPath);
        fetchCollectionNFTIds = fetchCollectionNFTIds.concat(
            collectionIds.map((collectionId) => [collection, collectionData.collectionPublicPath, collectionId]))
    }
    return fetchCollectionNFTIds;
}

export async function getAllOwnedNFTIs(address?: string) {
    address = address || (await fcl.currentUser.snapshot()).addr 
    const fetchedCollectionNFTIds = await getAllOwnedNFTIds(address);
    return await Promise.all(fetchedCollectionNFTIds.map(async (nftId) => {
        const nft = await fetchNFTView(address as string, nftId[1], nftId[2])
        return {
            address: nftId[0].address,
            contractName: nftId[0].contractName,
            ...nft
        } as NFTViewWithContractData
    }))
}