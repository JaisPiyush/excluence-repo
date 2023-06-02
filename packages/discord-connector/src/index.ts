export * from "./guild";
export * from "./member";
export * from "./role";
export * from "./types";

const discordBaseCDN = "https://cdn.discordapp.com";

function getImageExtension(hash: string): string {
    if (hash.indexOf("a_") === 0) return "gif";
    return "png";
}

export function getGuildIconURL(guildId: string, icon: string): string {
    return `${discordBaseCDN}/icons/${guildId}/${icon}.${getImageExtension(icon)}`;
}

export function getGuildBannerURL(
    guildId: string,
    banner: string
): string {
    return `${discordBaseCDN}/banners/${guildId}/${banner}.${getImageExtension(banner)}`
}

export function getGuildRoleIconURL(roleId: string, icon: string): string{
    return `${discordBaseCDN}/role-icons/${roleId}/${icon}.png`;
}