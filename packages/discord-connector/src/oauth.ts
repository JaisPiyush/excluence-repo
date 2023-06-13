import axios from "axios";
import { makeDiscordRequest } from "./discord-axios";
import { DiscordAPIError } from "./error";

/**
 * 
 * @param accessToken Discord user oauth access token
 * @returns string | null - the discord user id is returned upon success
 */
async function validateDiscordUserAccessToken(accessToken: string): Promise<string | null> {
    try {
        const res = await axios.request<{user: {id: string}}>({
            url: 'https://discordapp.com/api/oauth2/@me',
            method: 'get',
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        return res.data.user.id;
    }catch(e) {
        throw new DiscordAPIError((e as any).message);
    }
}

export {validateDiscordUserAccessToken};