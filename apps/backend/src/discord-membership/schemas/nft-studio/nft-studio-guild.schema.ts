import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { NFTStudio } from './nft-studio.schema';

export type NFTStudioGuildDocument = HydratedDocument<NFTStudioGuild>;

/**
 * NFTStudio's association with discord guild or server is recorded.
 *
 * An NFTStudio can hold multiple guilds while the reverse is not true.
 *
 */
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

    @Prop({ unique: true })
    guildId: string;
}

export const NFTStudioGuildSchema =
    SchemaFactory.createForClass(NFTStudioGuild);
