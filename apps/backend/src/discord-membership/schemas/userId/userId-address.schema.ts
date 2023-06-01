import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserIdAddressDocument = HydratedDocument<UserIdAddress>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class UserIdAddress {
    @Prop({ required: true })
    userId: string;

    @Prop({ unique: true, required: true })
    publicKey: string;
}

export const UserIdAddressSchema = SchemaFactory.createForClass(UserIdAddress);
