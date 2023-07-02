import { CompositeSignature } from '@onflow/fcl/types/current-user';
import { IsArray, IsNotEmpty, IsObject } from 'class-validator';

export class SignatureVerificationRequestData<T> {
    @IsObject()
    packet: {
        data: T;
        nonce: number;
    };

    @IsNotEmpty()
    @IsArray()
    signatures: CompositeSignature[];
}
