import { Controller, Post, Req } from '@nestjs/common';
import { Public } from './auth.decorator';
import { DiscordUserValidationDto } from './dto/index.dto';
import { AuthService } from './auth.service';
import { Request } from 'express';
import { AuthenticationPlatform } from './auth.types';
import { ProfileService } from 'src/profile/profile.service';

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly profileService: ProfileService,
    ) {}

    @Public()
    @Post('login')
    async loginForUser(discordUserValidationDto: DiscordUserValidationDto) {
        const discordId = await this.authService.validateDiscordUser(
            discordUserValidationDto,
        );
        const user = await this.authService.createWithPlatform(
            discordId,
            AuthenticationPlatform.discord,
        );
        await this.profileService.addProfileAddress({
            discordUserId: discordId,
            publicKey: discordUserValidationDto.address,
        });
        return user;
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
