import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  { HydratedDocument } from 'mongoose';

export type SyntheticRoleDocument = HydratedDocument<SyntheticRole>;

@Schema()
export class SyntheticRole {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    permissions: string;

    @Prop({required: true})
    color: string;

    @Prop({default: true})
    hoist: boolean;

    @Prop({default: null})
    icon: string | null;

    @Prop({default: null})
    unicode_emoji: string | null;

    @Prop({default: true})
    mentionable: boolean;
}

export const SyntheticRoleSchema = 
    SchemaFactory.createForClass(SyntheticRole);