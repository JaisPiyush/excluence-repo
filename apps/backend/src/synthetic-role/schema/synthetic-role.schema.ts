import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type SyntheticRoleDocument = HydratedDocument<SyntheticRole>;

/**
 * SyntheticRole is representation of role in discord servers.
 *
 * Since, roles can be associated with multiple NFTs at the
 * same time but each discord native role is exclusive to a
 * guild. This creates an obstacle when NFTStudio operates
 * with multiple guilds but requires NFT pass interchangeably.
 *
 * SyntheticRole solves the above problem by wrapping all the roles
 * on different guilds into one model and mapping the NFTs directly.
 */
@Schema()
export class SyntheticRole {
  @Prop()
  name: string;

  @Prop()
  permissions: string;

  @Prop()
  color: string;

  @Prop({ default: true })
  hoist: boolean;

  @Prop({ default: null })
  icon: string;

  @Prop({ default: null })
  unicode_emoji: string;

  @Prop({ default: true })
  mentionable: boolean;

  @Prop()
  creatorPublicKey: string;
}

export const SyntheticRoleSchema = SchemaFactory.createForClass(SyntheticRole);
