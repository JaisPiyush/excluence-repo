import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { CollectionMetadata } from './collection-metadata.schema';

export type CollectionGuildDocument = HydratedDocument<CollectionGuild>;

/**
 * NFT Collection can have multiple guilds and reverse
 * also holds the truth.
 */
@Schema()
export class CollectionGuild {
    // Address of the collection
    @Prop()
    address: string;

    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: CollectionMetadata.name,
        },
    })
    collection: CollectionMetadata;

    @Prop()
    guildId: string;
}

export const CollectionGuildSchema =
    SchemaFactory.createForClass(CollectionGuild);
CollectionGuildSchema.index(
    {
        address: 1,
        guildId: 1,
    },
    { unique: true },
);
