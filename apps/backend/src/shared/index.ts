import { ethers } from 'ethers';

export function getAccessTokenOrIdMessageHash(accessToken: string): string {
    const msg = `Excluence is asking permission to connect with your discord. Discord identifier ${accessToken}`;
    return ethers.keccak256(
        `\x19Ethereum Signed Message:\n` + msg.length + msg,
    );
}

export function recoverAddressFromAccessTokenOrIdSignature(
    accessToken: string,
    signature: string,
) {
    return ethers.recoverAddress(
        getAccessTokenOrIdMessageHash(accessToken),
        signature,
    );
}
