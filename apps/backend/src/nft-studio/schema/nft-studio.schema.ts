import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { AuthUser } from 'src/auth/schema/auth-user.schema';

export type NFTStudioDocument = HydratedDocument<NFTStudio>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class NFTStudio {
    @Prop()
    name: string;

    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: AuthUser.name,
        },
        unique: true,
    })
    owner: AuthUser;
}

export const NFTStudioSchema = SchemaFactory.createForClass(NFTStudio);
