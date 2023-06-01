import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NFTStudio } from './nft-studio.schema';

export type NFTStudioPublicKeyDocument = HydratedDocument<NFTStudioPublicKey>;

@Schema()
export class NFTStudioPublicKey {
    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: NFTStudio.name,
            required: true,
        },
    })
    studio: NFTStudio;

    @Prop({ unique: true, required: true })
    publicKey: string;
}

export const NFTStudioPublicKeySchema =
    SchemaFactory.createForClass(NFTStudioPublicKey);
