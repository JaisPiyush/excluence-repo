import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';

export class DiscordUserValidationDto {
    @IsNotEmpty()
    accessToken: string;
    @IsNotEmpty()
    signature: string;
    @IsNotEmpty()
    address: string;
}

export class CreateAuthUserDto {
    @IsNotEmpty()
    uniqueId: string;
    @IsBoolean()
    isSuperUser: boolean;
    @IsBoolean()
    isCreator: boolean;
    @IsNotEmpty()
    authenticationPlatform: string;
}
