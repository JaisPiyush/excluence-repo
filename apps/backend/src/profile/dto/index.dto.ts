import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddProfileUserAddressDto {
    @IsNotEmpty()
    @IsString()
    discordUserId: string;

    @IsNotEmpty()
    @IsString()
    publicKey: string;
}

export class AddProfileUserAddressRequestDto {
    @IsNotEmpty()
    publicKey: string;
    @IsNotEmpty()
    signature: string;
}

export class ProfileUserAddressDto extends AddProfileUserAddressDto {}

export class ProfileUserAddressQueryDto {
    @IsString()
    @IsOptional()
    discordUserId: string;
    @IsString()
    @IsOptional()
    publicKey: string;
}
