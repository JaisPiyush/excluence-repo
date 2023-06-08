import { HttpException, HttpStatus } from '@nestjs/common';

export class WalletSignatureVerificationFailed extends HttpException {
    constructor() {
        super('Address signature verification failed', HttpStatus.UNAUTHORIZED);
    }
}

export class DiscordAccessTokenValidationFailed extends HttpException {
    constructor() {
        super('Discord failed to verify.', HttpStatus.UNAUTHORIZED);
    }
}
