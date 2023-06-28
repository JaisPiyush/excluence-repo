import * as fcl from "@onflow/fcl"
import { CompositeSignature } from "@onflow/fcl/types/current-user";

export function encodeHex(str: string) {
    let result = ""
    for (let i =0; i < str.length ; i++) {
        const hex = str.charCodeAt(i).toString(16);
        result += hex.padStart(2, '0')
    }
    return result
}


export async function getMessageSigned(message: string) {
    const hex = encodeHex(message)
    try {
        return await fcl.currentUser.signUserMessage(hex)
    } catch(e) {
        return null
    }
}

export async function verifyMessageSignature(message: string, signatures: CompositeSignature[]) {
    return await fcl.AppUtils.verifyUserSignatures(
        encodeHex(message),
        signatures
    )
}