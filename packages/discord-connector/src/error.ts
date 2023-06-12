
export class DiscordAPIError extends Error {
    readonly code?: number;
    constructor(message: string, code?: number) {
        super(`DiscordAPIError: ${message}`);
        this.code = code;
    }
}