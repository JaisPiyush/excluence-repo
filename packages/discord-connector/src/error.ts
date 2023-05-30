
export class DiscordAPIError extends Error {
    constructor(message: string) {
        super(`DiscordAPIError: ${message}`);
    }
}