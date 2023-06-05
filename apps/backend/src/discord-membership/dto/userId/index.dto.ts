import { IsNotEmpty } from 'class-validator';

export class UserIdAddressDto {
    @IsNotEmpty()
    readonly userId: string;
    @IsNotEmpty()
    readonly publicKey: string;
}
