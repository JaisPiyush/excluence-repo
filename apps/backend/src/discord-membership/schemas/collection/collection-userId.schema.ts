import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CollectionMetadata } from './collection-metadata.schema';

export type CollectionUserIdDocument = HydratedDocument<CollectionUserId>;

@Schema()
export class CollectionUserId {
    // Address of the collection
    @Prop({ required: true })
    address: string;

    @Prop({
        required: true,
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: CollectionMetadata.name
        }
    })
    collection: CollectionMetadata;

    @Prop({ required: true })
    guildId: string;
}

export const CollectionUserIdSchema =
    SchemaFactory.createForClass(CollectionUserId);
CollectionUserIdSchema.index(
    {
        address: 1,
        guildId: 1,
    },
    { unique: true },
);
