export class CollectionMetadataDto {
    readonly address: string;
    readonly name: string;
    readonly logo?: string;
    readonly description?: string;
    readonly nftStudio_id: string;
}

export class CollectionUserIdDto {
    readonly address: string;
    readonly guildId: string;
}