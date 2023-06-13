import { Module } from '@nestjs/common';
import { SyntheticRoleService } from './synthetic-role.service';
import { SyntheticRoleController } from './synthetic-role.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  SyntheticRole,
  SyntheticRoleSchema,
} from './schema/synthetic-role.schema';
import {
  SyntheticRoleCollection,
  SyntheticRoleCollectionSchema,
} from './schema/synthetic-role-collection.schema';
import {
  SyntheticRoleGuildRole,
  SyntheticRoleGuildRoleSchema,
} from './schema/synthetic-role-guild-role.schema';
import { ProfileModule } from 'src/profile/profile.module';
import { NftCollectionModule } from 'src/nft-collection/nft-collection.module';
import { SyntheticRoleCollectionController } from './synthetic-role-collection.controller';
import { SyntheticRoleGuildController } from './synthetic-role-guild.controller';
import { ProfileRole, ProfileRoleSchema } from './schema/profile-role.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: SyntheticRole.name, schema: SyntheticRoleSchema },
      {
        name: SyntheticRoleCollection.name,
        schema: SyntheticRoleCollectionSchema,
      },
      {
        name: SyntheticRoleGuildRole.name,
        schema: SyntheticRoleGuildRoleSchema,
      },
      {
        name: ProfileRole.name,
        schema: ProfileRoleSchema,
      },
    ]),
    ProfileModule,
    NftCollectionModule,
  ],
  providers: [SyntheticRoleService],
  controllers: [
    SyntheticRoleController,
    SyntheticRoleCollectionController,
    SyntheticRoleGuildController,
  ],
})
export class SyntheticRoleModule {}
