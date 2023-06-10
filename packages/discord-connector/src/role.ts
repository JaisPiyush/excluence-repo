import { makeDiscordRequest } from "./discord-axios";
import { CreateRoleObject, RoleObject } from "./types";
import { Guild } from 'discord.js';


export async function getGuildRoles(guildId: string): Promise<RoleObject[]> {
    return await makeDiscordRequest<RoleObject[]>({
        url: `guilds/${guildId}/roles`,
        method: 'get'
    });
} 


export async function createGuildRole(guildId: string, args: CreateRoleObject): Promise<RoleObject> {
    return await makeDiscordRequest<RoleObject, CreateRoleObject>({
        url: `guilds/${guildId}/roles`,
        method: 'post',
        data: args
    });
}

export async function modifyGuildRole(guildId: string, roleId: string, args: Partial<CreateRoleObject>): Promise<RoleObject> {
    return await makeDiscordRequest<RoleObject, Partial<CreateRoleObject>>({
        url: `guilds/${guildId}/roles/${roleId}`,
        method: 'patch',
        data: args
    });
}


export async function deleteGuildRole(guildId: string, roleId: string): Promise<void> {
    return await makeDiscordRequest<void>({
        url: `guilds/${guildId}/roles/${roleId}`,
        method: 'delete'
    });
}

export async function addGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string
): Promise<void> {
    return await makeDiscordRequest<void>({
        url: `guilds/${guildId}/members/${userId}`,
        method: 'put'
    });
}


export async function removeGuildMemberRole(
    guildId: string,
    userId: string,
    roleId: string
): Promise<void> {
    return await makeDiscordRequest<void>({
        url: `guilds/${guildId}/members/${userId}/roles/${roleId}`,
        method: 'delete'
    })
}

