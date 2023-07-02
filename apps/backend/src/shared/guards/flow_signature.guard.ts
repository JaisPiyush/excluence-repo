import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { ISignatureVerificationRequestData } from '../types';
import { authenticateSignatureBasedRequestData } from '..';

@Injectable()
export class FlowSignatureGuard implements CanActivate {
    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest() as Request;
        const body = request.body as ISignatureVerificationRequestData<unknown>;
        await authenticateSignatureBasedRequestData(body);
        return true;
    }
}
