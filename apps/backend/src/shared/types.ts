import { CompositeSignature } from '@onflow/fcl/types/current-user';

export interface ResponseDataType<T> {
    data: T;
}

export interface ResponseErrorType {
    error: {
        message: string;
        code?: number | string;
    };
}

export type ResponseType<T> = Promise<ResponseDataType<T> | ResponseErrorType>;

export interface ISignatureVerificationRequestData<T> {
    packet: {
        data: T;
        nonce: number;
    };

    signatures: CompositeSignature[];
}
