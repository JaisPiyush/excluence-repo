import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type NFTStudioDocument = HydratedDocument<NFTStudio>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class NFTStudio {
    @Prop()
    name: string;
}

export const NFTStudioSchema = SchemaFactory.createForClass(NFTStudio);
