import { IsNotEmpty } from 'class-validator';

export class CollectionMetadataDto {
    @IsNotEmpty()
    readonly address: string;
    @IsNotEmpty()
    readonly name: string;
    readonly logo?: string;
    readonly description?: string;
    readonly nftStudio_id: string;
}

export class CollectionUserIdDto {
    readonly address: string;
    readonly guildId: string;
}
