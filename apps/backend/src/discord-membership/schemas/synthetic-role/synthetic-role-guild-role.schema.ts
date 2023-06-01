import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import  mongoose, { HydratedDocument } from 'mongoose';
import { SyntheticRole } from './synthetic-role.schema';
import { NFTStudioGuild } from '../nft-studio/nft-studio-guild.schema';

export type SyntheticRoleGuildRoleDocument = HydratedDocument<SyntheticRoleGuildRole>;

/***
 * SyntheticRole association with roleId on particular guild
 * 
 */
@Schema()
export class SyntheticRoleGuildRole {
    @Prop({unique: true, required: true})
    roleId: string;

    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: SyntheticRole.name
        },
        required: true
    })
    syntheticRole: SyntheticRole;


    @Prop({
        type: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: NFTStudioGuild.name
        },
        required: true
    })
    guild: NFTStudioGuild;


}

export const SyntheticRoleGuildRoleSchema = 
    SchemaFactory.createForClass(SyntheticRoleGuildRole);