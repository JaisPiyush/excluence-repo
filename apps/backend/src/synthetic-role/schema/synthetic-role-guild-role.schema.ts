import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SyntheticRole } from './synthetic-role.schema';

export type SyntheticRoleGuildRoleDocument =
  HydratedDocument<SyntheticRoleGuildRole>;

/***
 * SyntheticRole association with roleId on particular guild
 *
 */
@Schema()
export class SyntheticRoleGuildRole {
  @Prop({ unique: true })
  roleId: string;

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: SyntheticRole.name,
    },
  })
  syntheticRole: SyntheticRole;

  @Prop()
  guildId: string;
}

export const SyntheticRoleGuildRoleSchema = SchemaFactory.createForClass(
  SyntheticRoleGuildRole,
);
