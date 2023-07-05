import { getCollectionData } from "@/flow/get_collection_data.script";
import { fetchAllCollectionIds } from "@/flow/get_collection_ids.script";
import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"

export const useGetAllCollectionIds = (contractName: string, address: string) => {
    
    const [collectionIds, setCollectionIds] = useState<number[]>([]);

    const fetchCollectionIds = async () => {
        address = address || (await fcl.currentUser.snapshot()).addr
        const collectionData = await getCollectionData(contractName, address);
        const _collectionIds = await fetchAllCollectionIds(address, collectionData.collectionPublicPath);
        setCollectionIds([..._collectionIds])
    }

    useEffect(() => {
        fetchCollectionIds()
    },[])
    return collectionIds;
}