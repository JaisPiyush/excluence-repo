import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";
import { ParcelQLError } from "parcelQL";
import { Response } from 'express';

@Catch(ParcelQLError)
export class ParcelQLExceptionFilter implements ExceptionFilter {
    catch(exception: ParcelQLError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const status = 400

        response
            .status(status)
            .json({
                statusCode: status,
                timestamp: new Date().toISOString(),
                error: exception.message
            });
    }
}
