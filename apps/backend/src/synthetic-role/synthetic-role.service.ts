import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SyntheticRole } from './schema/synthetic-role.schema';
import { Model } from 'mongoose';
import { CreateSyntheticRoleDto } from './dto/index.dto';
import { SyntheticRoleCollection } from './schema/synthetic-role-collection.schema';
import { SyntheticRoleGuildRole } from './schema/synthetic-role-guild-role.schema';
import { createGuildRole } from '@excluence-repo/discord-connector';
import { NftCollectionService } from 'src/nft-collection/nft-collection.service';
import { ProfileService } from 'src/profile/profile.service';

@Injectable()
export class SyntheticRoleService {
  constructor(
    @InjectModel(SyntheticRole.name)
    private readonly syntheticRoleModel: Model<SyntheticRole>,
    @InjectModel(SyntheticRoleCollection.name)
    private readonly syntheticRoleCollectionModel: Model<SyntheticRoleCollection>,
    @InjectModel(SyntheticRoleGuildRole.name)
    private readonly syntheticRoleGuildRoleModel: Model<SyntheticRoleGuildRole>,
    private readonly nftCollectionService: NftCollectionService,
    private readonly profileService: ProfileService,
  ) {}

  ///********************************************** */
  ///**********SYNTHETIC ROLE********************* */
  ///******************************************** */
  async createSyntheticRole(
    publicKey: string,
    createSyntheticRole: CreateSyntheticRoleDto,
  ) {
    createSyntheticRole.hoist = createSyntheticRole.hoist || true;
    createSyntheticRole.icon = createSyntheticRole.icon || null;
    createSyntheticRole.unicode_emoji =
      createSyntheticRole.unicode_emoji || null;
    createSyntheticRole.mentionable = createSyntheticRole.mentionable || true;
    const syntheticRole = new this.syntheticRoleModel({
      creatorPublicKey: publicKey,
      ...createSyntheticRole,
    });
    try {
      return await syntheticRole.save();
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllRolesByCreator(publicKey: string): Promise<SyntheticRole[]> {
    return await this.syntheticRoleModel
      .find({ creatorPublicKey: publicKey })
      .exec();
  }

  async findSyntheticRoleUsingId(syntheticRoleId: string) {
    return await this.syntheticRoleModel.findById(syntheticRoleId).exec();
  }
  ///********************************************** */
  ///**********SYNTHETIC ROLE COLLECTION********** */
  ///******************************************** */
  async createSyntheticRoleCollections(
    syntheticRole: SyntheticRole,
    contractAddressArray: string[],
  ): Promise<SyntheticRoleCollection[]> {
    try {
      const models = await Promise.all(
        contractAddressArray.map((contractAddress) => {
          return new this.syntheticRoleCollectionModel({
            contractAddress: contractAddress,
            syntheticRole: (syntheticRole as any)._id,
          });
        }),
      );
      return await this.syntheticRoleCollectionModel.insertMany(models);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findAllCollectionRoleByCollectionAddress(
    publicKey: string,
    address: string,
  ) {
    const roles = await this.syntheticRoleCollectionModel
      .find({ contractAddress: address })
      .populate('syntheticRole')
      .exec();
    return roles.filter(
      (role) => role.syntheticRole.creatorPublicKey === publicKey,
    );
  }

  async findAllCollectionRoleBySyntheticRoleId(
    publicKey: string,
    syntheticRoleId: string,
  ) {
    const roles = await this.syntheticRoleCollectionModel
      .find({ syntheticRole: syntheticRoleId })
      .exec();
    return roles.filter(
      (role) => role.syntheticRole.creatorPublicKey === publicKey,
    );
  }

  async _addRolesToCollections(
    user: { publicKey: string },
    syntheticRole: SyntheticRole,
    collections: string[],
  ) {
    if (collections === undefined || collections.length == 0)
      return collections;
    collections = (
      await this.nftCollectionService.findAllNFTCollections(user.publicKey)
    )
      .filter((collection) => collections.includes(collection.address))
      .map((collection) => collection.address);
    if (collections.length === 0) return;
    await this.createSyntheticRoleCollections(syntheticRole, collections);
    return collections;
  }

  ///********************************************** */
  ///**********SYNTHETIC ROLE guild*************** */
  ///******************************************** */

  /**
   * Create role on the specified guild according to the SyntheticRole
   * @param guildId
   * @param syntheticRole
   * @returns
   */
  private async _createSyntheticRoleGuildRole(
    guildId: string,
    syntheticRole: SyntheticRole,
  ) {
    const role = await createGuildRole(guildId, {
      name: syntheticRole.name,
      permissions: syntheticRole.permissions,
      color: syntheticRole.color,
      hoist: syntheticRole.hoist,
      icon: syntheticRole.icon,
      unicode_emoji: syntheticRole.unicode_emoji,
      mentionable: syntheticRole.mentionable,
    });
    return new this.syntheticRoleGuildRoleModel({
      guildId: guildId,
      syntheticRole: (syntheticRole as any)._id,
      roleId: role.id,
    });
  }

  /**
   * Create roles on each guild and then bulk insert SyntheticRoleGuild
   * @param guildIdArray
   * @param syntheticRole
   * @returns
   */
  async createSyntheticRoleGuildRoles(
    guildIdArray: string[],
    syntheticRole: SyntheticRole,
  ) {
    try {
      const guildRoles = await Promise.all(
        guildIdArray.map((guildId) =>
          this._createSyntheticRoleGuildRole(guildId, syntheticRole),
        ),
      );
      return await this.syntheticRoleGuildRoleModel.insertMany(guildRoles);
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async _addRolesToGuilds(
    user: { publicKey: string },
    syntheticRole: SyntheticRole,
    guilds?: string[],
  ) {
    if (guilds !== undefined && guilds.length > 0) {
      guilds = await this.profileService.filterGuildsForPublicKey(
        user.publicKey,
        guilds,
      );
      if (guilds.length > 0) {
        await this.createSyntheticRoleGuildRoles(guilds, syntheticRole);
      }
    }
    return guilds;
  }

  async findAllGuildRoleBySyntheticRoleId(syntheticRoleId: string) {
    return await this.syntheticRoleGuildRoleModel
      .find({ syntheticRole: syntheticRoleId })
      .exec();
  }

  async findAllGuildRoleByGuildId(guildId: string) {
    return await this.syntheticRoleGuildRoleModel
      .find({ guildId: guildId })
      .populate('syntheticRole')
      .exec();
  }

  async findAllGuildRolesByCollectionAddress(contractAddress: string) {
    const syntheticRoleCollections = await this.syntheticRoleCollectionModel
      .find({
        contractAddress: contractAddress,
      })
      .select('syntheticRole')
      .exec();
    return await this.syntheticRoleGuildRoleModel
      .find({
        syntheticRole: {
          $in: syntheticRoleCollections.map((r) => r.syntheticRole),
        },
      })
      .exec();
  }
}
