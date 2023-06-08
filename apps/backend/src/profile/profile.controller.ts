import { Controller, Get, Req } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import { AuthUser } from 'src/auth/schema/auth-user.schema';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Get()
    async findAllPublicKeys(@Req() req: Request): Promise<string[]> {
        const user = req.user as AuthUser;
        const profiles = await this.profileService.findByDiscordUserId(
            user.uniqueId,
        );
        return profiles.map((profile) => profile.publicKey);
    }
}
