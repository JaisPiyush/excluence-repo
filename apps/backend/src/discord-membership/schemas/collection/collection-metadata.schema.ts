import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NFTStudio } from '../nft-studio/nft-studio.schema';

export type CollectionMetadataDocument = HydratedDocument<CollectionMetadata>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class CollectionMetadata {
    // Contract address of the NFT collection
    @Prop({ unique: true })
    address: string;

    @Prop({})
    name: string;

    @Prop()
    logo: string;

    @Prop()
    description: string;

    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: NFTStudio.name,
        },
    })
    nftStudio: NFTStudio;
}

export const CollectionMetadataSchema =
    SchemaFactory.createForClass(CollectionMetadata);
