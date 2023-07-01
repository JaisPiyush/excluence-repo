import { getMessageSigned } from "@/utility";
import { CollectionOnServer } from "@/utility/types";
import axios from "axios";
import * as fcl from "@onflow/fcl"

export async function createNFTCollection(collectionData?: Pick<CollectionOnServer, "contractName" | "externalURL">) {

    const address = (await fcl.currentUser.snapshot()).addr
    const packet = {data: {
        address,
        ...collectionData
    }, nonce: Date.now()}
    const signatures = await getMessageSigned(JSON.stringify(packet))
    const res = await axios.post<{data: CollectionOnServer}>('/api/collection/create', {
        packet: packet,
        signatures
    });

    return res.data.data
}