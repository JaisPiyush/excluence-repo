import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NFTCollectionGuildDocument = HydratedDocument<NFTCollectionGuild>;

@Schema()
export class NFTCollectionGuild {
  @Prop()
  contractAddress: string;

  @Prop()
  guildId: string;
}
export const NFTCollectionGuildSchema =
  SchemaFactory.createForClass(NFTCollectionGuild);
NFTCollectionGuildSchema.index(
  {
    contractAddress: 1,
    guildId: 1,
  },
  { unique: true },
);
