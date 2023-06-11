import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileGuildDocument = HydratedDocument<ProfileGuild>;

@Schema()
export class ProfileGuild {
  @Prop({ unique: true })
  guildId: string;

  @Prop()
  publicKey: string;
}

export const ProfileGuildSchema = SchemaFactory.createForClass(ProfileGuild);
