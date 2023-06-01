export class NFTStudioDto {
    readonly name: string;
}

export class NFTStudioGuildDto {
    readonly studio_id: string;
    readonly guildId: string;
    readonly name: string;
    readonly banner?: string;
}

export class NFTStudioPublicKeyDto {
    readonly studio_id: string;
    readonly publicKey: string;
}