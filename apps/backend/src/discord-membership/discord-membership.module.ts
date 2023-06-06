import { Module } from '@nestjs/common';
import { UserIdController } from './routes/user-id/user-id.controller';
import { NftStudioController } from './routes/nft-studio/nft-studio.controller';
import { SyntheticRoleController } from './routes/synthetic-role/synthetic-role.controller';
import { CollectionController } from './routes/collection/collection.controller';
import { UserIdService } from './routes/user-id/user-id.service';
import { NftStudioService } from './routes/nft-studio/nft-studio.service';
import { CollectionService } from './routes/collection/collection.service';
import { SyntheticRoleService } from './routes/synthetic-role/synthetic-role.service';
import { MongooseModule } from '@nestjs/mongoose';
import discordMembershipMongoSchemas from './schemas/index.schema';

@Module({
    imports: [MongooseModule.forFeature(discordMembershipMongoSchemas)],
    controllers: [
        UserIdController,
        NftStudioController,
        SyntheticRoleController,
        CollectionController,
    ],
    providers: [
        UserIdService,
        NftStudioService,
        CollectionService,
        SyntheticRoleService,
    ],
})
export class DiscordMembershipModule {}
