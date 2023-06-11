import axios, { AxiosRequestConfig, AxiosError } from "axios";
import { DiscordAPIError } from "./error";


const discordAxios = axios.create({
    baseURL: 'https://discordapp.com/api/',
    headers: {
        Authorization: `Bot ${process.env['NEXT_PUBLIC_DISCORD_BOT_TOKEN']}`
    }
})

export default discordAxios;

async function _makeRequest<T = any, D = any>(config: AxiosRequestConfig<D>): Promise<[T | null, string | null]> {
    
    try {
        const res = await discordAxios.request(config);
        return [res.data, null];

    }catch(error) {
        if (error instanceof AxiosError){
            if (error.response) {
                return [null, JSON.stringify(error.response.data)];
            }else {
                return [null, error.message];
            }
        }
        return [null, (error as any).message];
        
    }

}

async function makeDiscordRequest<T = any, D = any>(config: AxiosRequestConfig<D>, throwError = true): Promise<T>{
    const data = await _makeRequest<T,D>(config);
    if (throwError && data[1] !== null) {
        throw new DiscordAPIError(data[1]);
    }
    return data[0] as T;
}

export {makeDiscordRequest};

