import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
    ProfileUserAddress,
    ProfileUserAddressSchema,
} from './schema/profile-user-address.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: ProfileUserAddress.name, schema: ProfileUserAddressSchema },
        ]),
    ],
    controllers: [ProfileController],
    providers: [ProfileService],
})
export class ProfileModule {}
