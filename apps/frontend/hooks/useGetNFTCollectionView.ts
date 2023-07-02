import { getCollectionData } from "@/flow/get_collection_data.script";
import { NFTCollectionData } from "@/utility/types"
import { useEffect, useState } from "react"

export const useGetNFTCollectionView = (name: string, address?: string) => {
    const [collection, setCollection] = useState<NFTCollectionData | null>(null);

    const fetchNFTCollectionData = async () => {
        const collection = await getCollectionData(name, address);
        setCollection(collection)
    }

    useEffect(() => {
        fetchNFTCollectionData();
    }, [])
    
    return collection;
}