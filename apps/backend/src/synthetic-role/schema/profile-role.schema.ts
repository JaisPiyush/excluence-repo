import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileRoleDocument = HydratedDocument<ProfileRole>;

@Schema()
export class ProfileRole {
  @Prop()
  roleId: string;

  @Prop()
  discordUserId: string;

  @Prop()
  guildId: string;
}

export const ProfileRoleSchema = SchemaFactory.createForClass(ProfileRole);
