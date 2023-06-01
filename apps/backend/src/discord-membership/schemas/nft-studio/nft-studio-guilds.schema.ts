import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NFTStudio } from './nft-studio.schema';

export type NFTStudioGuildDocument = HydratedDocument<NFTStudioGuild>;

@Schema()
export class NFTStudioGuild {
    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            ref: NFTStudio.name,
            required: true,
        },
    })
    studio: NFTStudio;
    

    @Prop({ unique: true, required: true })
    guildId: string;

    @Prop({ required: true })
    name: string;

    @Prop()
    banner: string;
}

export const NFTStudioGuildSchema =
    SchemaFactory.createForClass(NFTStudioGuild);
