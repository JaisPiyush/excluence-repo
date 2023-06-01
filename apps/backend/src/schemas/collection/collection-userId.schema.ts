import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type CollectionUserIdDocument = HydratedDocument<CollectionUserId>;

@Schema()
export class CollectionUserId {
    @Prop({ required: true })
    address: string;

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
