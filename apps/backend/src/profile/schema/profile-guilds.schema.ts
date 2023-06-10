import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileGuildDocument = HydratedDocument<ProfileGuild>;

@Schema()
export class ProfileGuild {
  @Prop()
  guildId: string;

  @Prop({ unique: true })
  publicKey: string;
}

export const ProfileGuildSchema = SchemaFactory.createForClass(ProfileGuild);
