import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { SyntheticRole } from './synthetic-role.schema';

export type SyntheticRoleCollectionDocument =
  HydratedDocument<SyntheticRoleCollection>;

@Schema()
export class SyntheticRoleCollection {
  @Prop()
  contractAddress: string;

  @Prop({
    type: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: SyntheticRole.name,
    },
  })
  syntheticRole: SyntheticRole;
}

export const SyntheticRoleCollectionSchema = SchemaFactory.createForClass(
  SyntheticRoleCollection,
);
SyntheticRoleCollectionSchema.index(
  {
    contractAddress: 1,
    syntheticRole: 1,
  },
  {
    unique: true,
  },
);
