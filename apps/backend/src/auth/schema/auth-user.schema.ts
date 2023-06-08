import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { AuthenticationPlatform } from '../auth.types';

export type AuthUserDocument = HydratedDocument<AuthUser>;

@Schema()
export class AuthUser {
    @Prop({ unique: true })
    uniqueId: string;

    @Prop({ default: false })
    isSuperUser: boolean;

    @Prop({ default: false })
    isCreator: boolean;

    @Prop({
        enum: [AuthenticationPlatform.discord, AuthenticationPlatform.magic],
    })
    authenticationPlatform: string;
}

export const AuthUserSchema = SchemaFactory.createForClass(AuthUser);
