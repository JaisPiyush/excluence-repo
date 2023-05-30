import axios from "axios";


const discordAxios = axios.create({
    baseURL: 'https://discordapp.com/api/',
    headers: {
        Authorization: `Bot ${process.env['NEXT_PUBLIC_DISCORD_BOT_TOKEN']}`
    }
})

export {discordAxios}