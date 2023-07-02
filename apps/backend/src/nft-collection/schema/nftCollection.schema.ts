import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type ProfileUserAddressDocument = HydratedDocument<NFTCollection>;

@Schema()
export class NFTCollection {
    @Prop({ required: true })
    externalURL: string;

    @Prop({ required: true })
    address: string;

    @Prop({ required: true })
    contractName: string;
}

export const NFTCollectionSchema = SchemaFactory.createForClass(NFTCollection);
