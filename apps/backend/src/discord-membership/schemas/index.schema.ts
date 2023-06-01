import { ModelDefinition } from '@nestjs/mongoose';
import { UserIdAddress, UserIdAddressSchema } from './userId/userId-address.schema';
import { NFTStudio, NFTStudioSchema } from './nft-studio/nft-studio.schema';
import { NFTStudioPublicKey, NFTStudioPublicKeySchema } from './nft-studio/nft-studio-public-key.schema';
import { NFTStudioGuild, NFTStudioGuildSchema } from './nft-studio/nft-studio-guild.schema';
import { CollectionMetadata, CollectionMetadataSchema } from './collection/collection-metadata.schema';
import { CollectionGuild, CollectionGuildSchema } from './collection/collection-guild.schema';
import { SyntheticRole, SyntheticRoleSchema } from './synthetic-role/synthetic-role.schema';
import { SyntheticRoleGuildRole, SyntheticRoleGuildRoleSchema } from './synthetic-role/synthetic-role-guild-role.schema';
import { SyntheticRoleCollection, SyntheticRoleCollectionSchema } from './synthetic-role/synthetic-role-collection.schema';

const schemas: ModelDefinition[] = [
    {name: UserIdAddress.name, schema: UserIdAddressSchema},
    {name: NFTStudio.name, schema: NFTStudioSchema},
    {name: NFTStudioPublicKey.name, schema: NFTStudioPublicKeySchema},
    {name: NFTStudioGuild.name, schema: NFTStudioGuildSchema},
    {name: CollectionMetadata.name, schema: CollectionMetadataSchema},
    {name: CollectionGuild.name, schema: CollectionGuildSchema},
    {name: SyntheticRole.name, schema: SyntheticRoleSchema},
    {name: SyntheticRoleGuildRole.name, schema: SyntheticRoleGuildRoleSchema},
    {name: SyntheticRoleCollection.name, schema: SyntheticRoleCollectionSchema}
];

export default schemas;