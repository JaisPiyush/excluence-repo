import { verifyMessageSignature } from ".";
import { SignatureVerificationRequestData } from "./types";

const REQUEST_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes

export async function authenticateSignatureBasedRequestData<T>(body: SignatureVerificationRequestData<T>) : Promise<void> {
    const authenticated = await verifyMessageSignature(JSON.stringify(body.packet), body.signatures);
    if (!authenticated || Date.now() - body.packet.nonce > REQUEST_TIME_LIMIT ) throw new Error("Signature authentication failed.")
}