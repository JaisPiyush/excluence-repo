import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Magic } from '@magic-sdk/admin';
import { Request } from 'express';
import { CreateAuthUserDto, DiscordUserValidationDto } from './dto/index.dto';
import { validateDiscordUserAccessToken } from '@excluence-repo/discord-connector';
import {
    DiscordAccessTokenValidationFailed,
    WalletSignatureVerificationFailed,
} from './auth.errors';
import { InjectModel } from '@nestjs/mongoose';
import { AuthUser } from './schema/auth-user.schema';
import { Model } from 'mongoose';
import { AuthenticationPlatform } from './auth.types';
import { JwtService } from '@nestjs/jwt';
import { recoverAddressFromAccessTokenOrIdSignature } from 'src/helpers';

@Injectable()
export class AuthService {
    private readonly magic: Magic;
    constructor(
        @InjectModel(AuthUser.name)
        private readonly authUserModel: Model<AuthUser>,
        private readonly jwtService: JwtService,
    ) {
        this.magic = new Magic(process.env['MAGIC_SECRET_KEY']);
    }
    // Using Bearer ${didToken}
    async validateDIDToken(req: Request): Promise<string> {
        const didToken = req.headers.authorization?.substring(7);
        try {
            this.magic.token.validate(didToken as string);
            return this.magic.token.getIssuer(didToken as string);
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.UNAUTHORIZED);
        }
    }

    async validateDiscordUser(
        discordUserValidationDto: DiscordUserValidationDto,
    ): Promise<string> {
        const address = recoverAddressFromAccessTokenOrIdSignature(
            discordUserValidationDto.accessToken,
            discordUserValidationDto.signature,
        );
        if (address !== discordUserValidationDto.address) {
            throw new WalletSignatureVerificationFailed();
        }
        const discordId = await validateDiscordUserAccessToken(
            discordUserValidationDto.accessToken,
        );
        if (discordId !== null) return discordId;
        throw new DiscordAccessTokenValidationFailed();
    }

    private async create(
        createAuthUserDto: CreateAuthUserDto,
    ): Promise<AuthUser> {
        const authUser = new this.authUserModel(createAuthUserDto);
        return await authUser.save();
    }

    async createSuperUser(uniqueId: string) {
        return await this.create({
            uniqueId: uniqueId,
            isSuperUser: true,
            isCreator: false,
            authenticationPlatform: AuthenticationPlatform.magic,
        });
    }

    async createCreatorUser(uniqueId: string) {
        return await this.create({
            uniqueId: uniqueId,
            isSuperUser: false,
            isCreator: true,
            authenticationPlatform: AuthenticationPlatform.magic,
        });
    }

    async createUser(uniqueId: string) {
        return await this.create({
            uniqueId: uniqueId,
            isSuperUser: false,
            isCreator: false,
            authenticationPlatform: AuthenticationPlatform.discord,
        });
    }

    async createWithPlatform(
        uniqueId: string,
        platform: AuthenticationPlatform,
        isSuperUser = false,
    ) {
        const usersWithDiscordId = await this.findUser(uniqueId);
        let user: AuthUser;
        if (usersWithDiscordId.length > 0) {
            user = usersWithDiscordId[0];
        } else {
            switch (platform) {
                case AuthenticationPlatform.magic:
                    user = isSuperUser
                        ? await this.createSuperUser(uniqueId)
                        : await this.createCreatorUser(uniqueId);
                    break;
                case AuthenticationPlatform.discord:
                    user = await this.createUser(uniqueId);
            }
        }
        return await this.login(user);
    }

    async login(user: AuthUser): Promise<{ access_token: string }> {
        const payload = {
            sub: user.uniqueId,
        };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }

    async findUser(uniqueId: string): Promise<AuthUser[]> {
        return await this.authUserModel.find({ uniqueId }).exec();
    }
}
