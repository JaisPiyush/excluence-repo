import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { SyntheticRole } from './schema/synthetic-role.schema';
import { Model } from 'mongoose';

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
}
