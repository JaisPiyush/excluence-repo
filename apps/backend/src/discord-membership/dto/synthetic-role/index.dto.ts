export class SyntheticRoleDto {
    readonly name: string;
    readonly permissions: string;
    readonly color: string;
    readonly hoist?: boolean;
    readonly icon?: string | null;
    readonly unicode_emoji?: string | null;
    readonly mentionable?: boolean;
}


export class SyntheticRoleGuildRoleDto {
    readonly roleId: string;
    readonly guild_id: string;
    readonly syntheticRole_id?: string;

}

export class SyntheticRoleCollectionDto {
    readonly address: string;
    readonly syntheticRole_id?: string;
}