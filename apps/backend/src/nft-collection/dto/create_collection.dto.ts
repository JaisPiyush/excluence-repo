import { IsNotEmpty, IsString } from 'class-validator';
import { SignatureVerificationRequestData } from 'src/shared/dto/flow_signature.dto';

export class CreateNFTCollectionDataDto {
    @IsNotEmpty()
    @IsString()
    externalURL: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    contractName: string;
}

export const CreateNFTCollectionDto =
    SignatureVerificationRequestData<CreateNFTCollectionDataDto>;
