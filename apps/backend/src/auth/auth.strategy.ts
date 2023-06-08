import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        console.log('key ', process.env['JWT_ENC_KEY'] as string);
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            // secretOrKey: process.env['JWT_ENC_KEY'] as string,
            // secret: process.env['JWT_ENC_KEY'] as string,
            secretOrKey:
                '255FBE20A909FB602B2D34F56FE20CB0105058E8DE401FD2D55330980D4EC55E',
        });
    }

    async validate(payload: any) {
        return {
            uniqueId: payload.sub,
        };
    }
}
