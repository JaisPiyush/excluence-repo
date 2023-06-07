import { OAuthConfig, OAuthUserConfig } from "next-auth/providers";
import DiscordProvider, {DiscordProfile} from "next-auth/providers/discord";


export default function DiscordBot<P extends DiscordProfile>(
    options: OAuthUserConfig<P>
): OAuthConfig<P> {
    const config = DiscordProvider(options);
    config.id = "discord_bot"
    return config;
}