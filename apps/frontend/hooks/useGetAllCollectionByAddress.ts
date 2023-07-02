import { CollectionOnServer } from "@/utility/types"
import { useEffect, useState } from "react"
import * as fcl from "@onflow/fcl"
import {  getAllCollectionByAddress } from "@/api/nftCollection";

export const useGetAllCollectionByAddress = (address?: string) => {
    const [collections, setCollections] = useState<CollectionOnServer[]>([]);

    const fetchAllCollections = async () => {
        let addr = address || (await fcl.currentUser.snapshot()).addr;
        const collections = await getAllCollectionByAddress(addr);
        setCollections([...collections]);
    }

    useEffect(() => {
        fetchAllCollections(); 
    }, [])
    
    return collections;
}