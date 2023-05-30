import { makeDiscordRequest } from "./discord-axios";
import { GuildObject } from "./types";

export async function getGuild(args: {
            id: string;
            with_counts?: boolean}
    ): Promise<GuildObject> {
            const data = await makeDiscordRequest<GuildObject>({
                url: `guilds/${args.id}`,
                method: 'get',
                params: {
                    with_counts: args.with_counts
                }
            });
            return data;
}