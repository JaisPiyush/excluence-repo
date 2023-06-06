import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileUserAddressDocument = HydratedDocument<ProfileUserAddress>;

/**
 * Public key associated with the discord userId.
 *
 * A discord userId can hold multiple public key while
 * the reverse is not true.
 */
@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class ProfileUserAddress {
    @Prop()
    discordUserId: string;

    @Prop({ unique: true })
    publicKey: string;
}

export const ProfileUserAddressSchema =
    SchemaFactory.createForClass(ProfileUserAddress);
