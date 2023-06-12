

interface RoleTagsObject {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
    subscription_listing_id?: string;
    available_for_purchase?: null;
    guild_connections?: null
}

export interface CreateRoleObject {
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    mentionable: boolean;
}

export type RoleObject = CreateRoleObject & {
    id: string;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    managed: boolean;
    tags?: RoleTagsObject
}

export interface AddGuildMember {
    access_token: string;
    nick?: string;
    roles?: string[];
    mute?: boolean;
    deaf?: boolean;
}

export type ModifyGuildMember = Omit<AddGuildMember, "access_token"> &  {
    channel_id?: string;
    communication_disabled_until?: string;
    flags?: number;
};

export interface GuildMember extends Record<string, any> {
    roles: RoleObject[]
}


export type GuildObject = {
    id: string;
    name: string;
    icon: string | null;
    description: string | null;
    banner: string | null;
    approximate_member_count?: number;
    approximate_presence_count?: number;

} & Record<string, unknown>;




