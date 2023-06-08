import { Controller, Post, Req } from '@nestjs/common';
import { Public } from './auth.decorator';
import { DiscordUserValidationDto } from './dto/index.dto';
import { AuthService } from './auth.service';
import { AuthUser } from './schema/auth-user.schema';
import { Request } from 'express';
import { AuthenticationPlatform } from './auth.types';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Public()
    @Post('login')
    async loginForUser(discordUserValidationDto: DiscordUserValidationDto) {
        const discordId = await this.authService.validateDiscordUser(
            discordUserValidationDto,
        );
        return await this.authService.createWithPlatform(
            discordId,
            AuthenticationPlatform.discord,
        );
    }

    @Public()
    @Post('login/creator')
    async loginForCreator(@Req() req: Request) {
        const uid = await this.authService.validateDIDToken(req);
        return await this.authService.createWithPlatform(
            uid,
            AuthenticationPlatform.magic,
            false,
        );
    }

    @Public()
    @Post('login/admin')
    async loginFormAdmin(@Req() req: Request) {
        const uid = await this.authService.validateDIDToken(req);
        return await this.authService.createWithPlatform(
            uid,
            AuthenticationPlatform.magic,
            true,
        );
    }
}
