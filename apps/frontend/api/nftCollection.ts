import { CollectionOnServer } from "@/utility/types";
import { server } from "./server";
import { AxiosError } from "axios";
import * as fcl from "@onflow/fcl"
import { getMessageSigned } from "@/utility";

export async function getAllCollection(address: string): Promise<CollectionOnServer[]> {
    try {
        const res = await server.get<{data: CollectionOnServer[]}>(`/nft-collection/${address}`);
        return res.data.data
    }catch(e) {
        return []
    }
}

export async function isExternalURLAvailable(externalURL: string): Promise<boolean> {
    try {
        const res = await server.get<{data: boolean}>(`/nft-collection/isExternalURLAvailable?url=${encodeURI(externalURL)}`)
        return res.data.data
    } catch (e) {
        return false;
    }
}

export async function createNFTCollection(data: Pick<CollectionOnServer, "contractName" | "externalURL">): Promise<[CollectionOnServer | null, string | null]> {
   try {
    const address = (await fcl.currentUser.snapshot()).addr
    const packet = {data: {
        address,
        ...data
    }, nonce: Date.now()}
    const signatures = await getMessageSigned(JSON.stringify(packet))
    const res = await server.post<{data: CollectionOnServer}>('/nft-collection', {
        packet,
        signatures
    });
    return [res.data.data, null];
   } catch (e) {
        if (e instanceof AxiosError) {
            return [null, e.message];
        }
        return [null, (e as Error).message]
   }
}