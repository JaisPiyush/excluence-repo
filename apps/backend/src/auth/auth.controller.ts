import { Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body('idToken') idToken: string) {
        try {
            const address = await this.authService.authenticateWeb3AuthIdToken(idToken);
            return await this.authService.loginWeb3Auth(address);
        }catch(e) {
            throw new UnauthorizedException();
        }
    }
}