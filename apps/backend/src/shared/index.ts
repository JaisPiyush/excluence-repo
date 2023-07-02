import * as fcl from '@onflow/fcl';
import { CompositeSignature } from '@onflow/fcl/types/current-user';
import { SignatureVerificationRequestData } from './dto/flow_signature.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

export function encodeHex(str: string) {
    let result = '';
    for (let i = 0; i < str.length; i++) {
        const hex = str.charCodeAt(i).toString(16);
        result += hex.padStart(2, '0');
    }
    return result;
}

export async function verifyMessageSignature(
    message: string,
    signatures: CompositeSignature[],
) {
    return await fcl.AppUtils.verifyUserSignatures(
        encodeHex(message),
        signatures,
    );
}

const REQUEST_TIME_LIMIT = 5 * 60 * 1000; // 5 minutes

export async function authenticateSignatureBasedRequestData<T>(
    body: SignatureVerificationRequestData<T>,
): Promise<void> {
    try {
        const authenticated = await verifyMessageSignature(
            JSON.stringify(body.packet),
            body.signatures,
        );
        if (
            !authenticated ||
            Date.now() - body.packet.nonce > REQUEST_TIME_LIMIT
        )
            throw new Error('Signature verification failed');
    } catch (e) {
        throw new HttpException((e as Error).message, HttpStatus.FORBIDDEN);
    }
}
