import { makeDiscordRequest } from "./discord-axios";

/**
 * 
 * @param accessToken Discord user oauth access token
 * @returns string | null - the discord user id is returned upon success
 */
async function validateDiscordUserAccessToken(accessToken: string): Promise<string | null> {
    try {
        const res = await makeDiscordRequest<{user: {id: string}}>({
            url: 'oatuh2/@me',
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.user.id;
    }catch(e) {
        return null;
    }
}