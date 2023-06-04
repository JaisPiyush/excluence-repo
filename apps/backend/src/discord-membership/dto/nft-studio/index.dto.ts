import { IsNotEmpty } from 'class-validator';

export class CreateNFTStudioDto {
    @IsNotEmpty()
    readonly name: string;
}

export class NFTStudioGuildDto {
    readonly studio_id: string;
    readonly guildId: string;
    readonly name: string;
    readonly banner: string | null;
    readonly icon: string | null;
}

export class CreateNFTStudioGuildDto {
    readonly studio_id: string;
    readonly guildId: string;
}

export class NFTStudioPublicKeyDto {
    readonly studio_id: string;
    readonly publicKey: string;
}
