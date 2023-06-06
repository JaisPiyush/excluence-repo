import { HttpException, HttpStatus } from '@nestjs/common';

export class DuplicateProfileUserAddress extends HttpException {
    constructor() {
        super(
            `ProfileUserAddress with discordUserId and publicKey already exists.`,
            HttpStatus.BAD_REQUEST,
        );
    }
}

export class ProfileUserAddressAlreadyExists extends HttpException {
    constructor() {
        super(
            `ProfileUserAddress with publicKey already exists.`,
            HttpStatus.CONFLICT,
        );
    }
}

export class ProfileUserAddressQueryIsEmpty extends HttpException {
    constructor() {
        super(
            `query params are missing, required at least one query param to fetch result.`,
            HttpStatus.BAD_REQUEST,
        );
    }
}
