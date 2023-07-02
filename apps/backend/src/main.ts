import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as fcl from '@onflow/fcl';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.enableCors();
    app.useGlobalPipes(new ValidationPipe());
    fcl.config({
        'accessNode.api': 'https://rest-testnet.onflow.org',
        'flow.network': 'testnet',
    });

    await app.listen(8080);
}
bootstrap();
