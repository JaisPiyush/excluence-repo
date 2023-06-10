import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileDocument = HydratedDocument<Profile>;

@Schema()
export class Profile {
  @Prop()
  discordUserId: string;

  @Prop({ unique: true })
  publicKey: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
