import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NFTDocument = HydratedDocument<NFT>;

@Schema()
export class NFT {
    @Prop()
    address: string;

    @Prop()
    id: number;

    @Prop()
    collectionName: string;
}

export const NFTSchema = SchemaFactory.createForClass(NFT);
