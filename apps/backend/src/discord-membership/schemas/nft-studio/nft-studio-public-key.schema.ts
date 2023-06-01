import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NFTStudio } from './nft-studio.schema';

export type NFTStudioPublicKeyDocument = HydratedDocument<NFTStudioPublicKey>;

/**
 * Model holds all the cryptographic public keys associated with the NFTStudio.
 * 
 * Currently, it only supports top-level owner's public keys but later more complex
 * role based key associations can be added for managing the NFTStudio on multiple
 * levels
 * 
 */
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
