import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SyntheticRole } from './schema/synthetic-role.schema';
import { Model } from 'mongoose';
import { CreateSyntheticRoleDto } from './dto/index.dto';

@Injectable()
export class SyntheticRoleService {
  constructor(
    @InjectModel(SyntheticRole.name)
    private readonly syntheticRoleModel: Model<SyntheticRole>,
  ) {}

  async findAllRolesByCreator(publicKey: string): Promise<SyntheticRole[]> {
    return await this.syntheticRoleModel
      .find({ creatorPublicKey: publicKey })
      .exec();
  }

  async createSyntheticRole(
    publicKey: string,
    createSyntheticRole: CreateSyntheticRoleDto,
  ) {
    //TODO: add the role
    createSyntheticRole.hoist = createSyntheticRole.hoist || true;
    createSyntheticRole.icon = createSyntheticRole.icon || null;
    createSyntheticRole.unicode_emoji =
      createSyntheticRole.unicode_emoji || null;
    createSyntheticRole.mentionable = createSyntheticRole.mentionable || true;
    const syntheticRole = new this.syntheticRoleModel({
      creatorPublicKey: publicKey,
      ...createSyntheticRole,
    });
    return await syntheticRole.save();
  }
}
