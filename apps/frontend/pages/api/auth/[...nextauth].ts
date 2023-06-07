import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord";
import DiscordBotProvider from "@common/next-auth-provider/discord-bot-provider";


export default NextAuth({
    providers: [
        DiscordProvider({
            clientId: process.env['NEXT_PUBLIC_DISCORD_CLIENT_ID'] as string,
            clientSecret: process.env['NEXT_PUBLIC_DISCORD_CLIENT_SECRET'] as string,
            authorization: process.env['NEXT_PUBLIC_DISCORD_OAUTH_URL'] as string
        }),
        DiscordBotProvider({
            clientId: process.env['NEXT_PUBLIC_DISCORD_CLIENT_ID'] as string,
            clientSecret: process.env['NEXT_PUBLIC_DISCORD_CLIENT_SECRET'] as string,
            authorization: process.env['NEXT_PUBLIC_DISCORD_BOT_URL'] as string
        })
    ],
    callbacks: {
        async jwt({token, account}) {
            // console.log(token, account)
            if (account) {
                token.userId = account.providerAccountId;
                token.accessToken = account.access_token;
                // If bot is added to any server the guild will be available
                if (account.guild && (account.guild as any).id) {
                    token.guildId = (account.guild as any).id;
                }
            }
            return token;
        },
        async session({session, token, user}) {
            (session as any).userId = token.userId;
            (session as any).accessToken = token.accessToken;
            (session as any).guildId = token.guildId;
            return session;
        }
    }
});