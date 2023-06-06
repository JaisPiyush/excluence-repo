import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
    AddProfileUserAddressDto,
    ProfileUserAddressQueryDto,
} from './dto/index.dto';
import { ProfileService } from './profile.service';
import { ProfileUserAddressQueryIsEmpty } from './profile.error';

@Controller('profile')
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Post()
    async addProfileAddress(
        @Body() addProfileAddress: AddProfileUserAddressDto,
    ) {
        return await this.profileService.addProfileAddress(addProfileAddress);
    }

    @Get()
    async find(@Query() query: ProfileUserAddressQueryDto) {
        if (query.publicKey !== undefined) {
            return await this.profileService.findByPublicKey(query.publicKey);
        }
        if (query.discordUserId !== undefined) {
            return await this.profileService.findByDiscordUserId(
                query.discordUserId,
            );
        }
        throw new ProfileUserAddressQueryIsEmpty();
    }
}
