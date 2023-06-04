import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
    CreateNFTStudioDto,
    NFTStudioGuildDto,
} from 'src/discord-membership/dto/nft-studio/index.dto';
import {
    NFTStudioGuild,
    NFTStudioGuildDocument,
} from 'src/discord-membership/schemas/nft-studio/nft-studio-guild.schema';
import { NFTStudioPublicKey } from 'src/discord-membership/schemas/nft-studio/nft-studio-public-key.schema';
import { NFTStudio } from 'src/discord-membership/schemas/nft-studio/nft-studio.schema';
import {
    GuildObject,
    getGuild,
    getGuildBannerURL,
    getGuildIconURL,
} from '@excluence-repo/discord-connector';

type _NFTStudioGuildDocument = NFTStudioGuildDocument & { studio: string };

@Injectable()
export class NftStudioService {
    constructor(
        @InjectModel(NFTStudio.name) private nftStudioModel: Model<NFTStudio>,
        @InjectModel(NFTStudioPublicKey.name)
        private nftStudioPublicModel: Model<NFTStudioPublicKey>,
        @InjectModel(NFTStudioGuild.name)
        private nftStudioGuildModel: Model<NFTStudioGuild>,
    ) {}

    private _serializeNFTStudioGuild(
        nftStudioGuild: _NFTStudioGuildDocument,
        guild: GuildObject,
    ): NFTStudioGuildDto {
        return {
            studio_id: nftStudioGuild.studio,
            guildId: nftStudioGuild.guildId,
            name: guild.name,
            banner:
                guild.banner !== null
                    ? getGuildBannerURL(guild.id, guild.banner)
                    : null,
            icon:
                guild.icon !== null
                    ? getGuildIconURL(guild.id, guild.icon)
                    : null,
        };
    }

    private async serializeNFTStudioGuilds(
        studioGuilds: _NFTStudioGuildDocument[],
    ): Promise<NFTStudioGuildDto[]> {
        const guilds: Record<string, GuildObject> = {};
        return await Promise.all(
            studioGuilds.map(async (studioGuild) => {
                if (guilds[studioGuild.guildId] === undefined) {
                    guilds[studioGuild.guildId] = await getGuild({
                        id: studioGuild.guildId,
                        with_counts: false,
                    });
                }
                return await this._serializeNFTStudioGuild(
                    studioGuild,
                    guilds[studioGuild.guildId],
                );
            }),
        );
    }

    async createNFTStudio(
        nFTStudioDto: CreateNFTStudioDto,
    ): Promise<NFTStudio> {
        const nftStudio = new this.nftStudioModel(nFTStudioDto);
        return await nftStudio.save();
    }

    async findNFTStudioGuildByGuildId(
        guildId: string,
    ): Promise<NFTStudioGuildDto | null> {
        const nftStudioGuild = await this.nftStudioGuildModel
            .findOne({ guildId: guildId })
            .select('guildId studio')
            .exec();
        if (nftStudioGuild === null) return null;
        return (
            await this.serializeNFTStudioGuilds([
                nftStudioGuild as _NFTStudioGuildDocument,
            ])
        )[0];
    }
}
