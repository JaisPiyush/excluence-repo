

interface DiscordRoleTagsObject {
    bot_id?: string;
    integration_id?: string;
    premium_subscriber?: null;
    subscription_listing_id?: string;
    available_for_purchase?: null;
    guild_connections?: null
}

export interface DiscordCreateRoleObject {
    name: string;
    permissions: string;
    color: number;
    hoist: boolean;
    icon: string | null;
    unicode_emoji: string | null;
    mentionable: boolean;
}

export type DiscordRoleObject = DiscordCreateRoleObject & {
    id: string;
    icon?: string | null;
    unicode_emoji?: string | null;
    position: number;
    managed: boolean;
    tags?: DiscordRoleTagsObject
}

export interface DiscordAddGuildMember {
    access_token: string;
    nick?: string;
    roles?: string[];
    mute?: boolean;
    deaf?: boolean;
}

export type DiscordModifyGuildMember = Omit<DiscordAddGuildMember, "access_token"> &  {
    channel_id?: string;
    communication_disabled_until?: string;
    flags?: number;
};




