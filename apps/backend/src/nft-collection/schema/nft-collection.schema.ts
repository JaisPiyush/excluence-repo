import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NFTCollectionDocument = HydratedDocument<NFTCollection>;

@Schema()
export class NFTCollection {
  @Prop({ unique: true })
  address: string;

  @Prop()
  creatorPublicKey: string;
}

export const NFTCollectionSchema = SchemaFactory.createForClass(NFTCollection);
