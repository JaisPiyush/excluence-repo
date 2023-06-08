import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './auth.strategy';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthUser, AuthUserSchema } from './schema/auth-user.schema';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: AuthUser.name, schema: AuthUserSchema },
        ]),
        PassportModule,
        JwtModule.register({
            secret: process.env['JWT_ENC_KEY'] as string,
            signOptions: { expiresIn: '180s' },
        }),
        ProfileModule,
    ],
    providers: [JwtStrategy, AuthService],
    controllers: [AuthController],
})
export class AuthModule {}
