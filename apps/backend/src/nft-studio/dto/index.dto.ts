import { IsNotEmpty } from 'class-validator';

export class CreateNFTStudioDto {
    @IsNotEmpty()
    name: string;
}
