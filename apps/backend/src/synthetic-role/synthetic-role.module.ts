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
    ]),
  ],
  providers: [SyntheticRoleService],
  controllers: [SyntheticRoleController],
})
export class SyntheticRoleModule {}
