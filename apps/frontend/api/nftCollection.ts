import { CollectionOnServer } from "@/utility/types";
import axios from "axios";

export async function getAllCollection(address: string): Promise<CollectionOnServer[]> {
    try {
        const res = await axios.get<{data: CollectionOnServer[]}>(`/api/collection/${address}`);
        return res.data.data
    }catch(e) {
        return []
    }
}