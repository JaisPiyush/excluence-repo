import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { SyntheticRole } from './synthetic-role.schema';
import { CollectionMetadata } from '../collection/collection-metadata.schema';

export type SyntheticRoleCollectionDocument = HydratedDocument<SyntheticRoleCollection>;

@Schema()
export class SyntheticRoleCollection {

    @Prop({
        required: true,
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: CollectionMetadata.name
        }
    })
    collection: CollectionMetadata;

    @Prop({
        required: true,
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: SyntheticRole.name
        }
    })
    syntheticRole: SyntheticRole;
}

export const SyntheticRoleCollectionSchema = 
    SchemaFactory.createForClass(SyntheticRoleCollection);
SyntheticRoleCollectionSchema.index({
    collection: 1,
    syntheticRole: 1
}, {
    unique: true
});