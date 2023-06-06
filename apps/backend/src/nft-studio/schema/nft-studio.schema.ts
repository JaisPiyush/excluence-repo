import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { ProfileUserAddress } from 'src/profile/schema/profile-user-address.schema';

export type NFTStudioDocument = HydratedDocument<NFTStudio>;

@Schema({ timestamps: { createdAt: true, updatedAt: true } })
export class NFTStudio {
    @Prop()
    name: string;

    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: ProfileUserAddress.name,
            required: true,
        },
    })
    profileUserAddress: ProfileUserAddress;
}

export const NFTStudioSchema = SchemaFactory.createForClass(NFTStudio);
