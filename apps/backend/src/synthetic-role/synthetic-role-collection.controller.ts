import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Req,
  UnauthorizedException,
} from '@nestjs/common';
import { SyntheticRoleService } from './synthetic-role.service';

@Controller('synthetic-role/collection')
export class SyntheticRoleCollectionController {
  constructor(private readonly syntheticRoleService: SyntheticRoleService) {}
  @Post(':id')
  async addSyntheticRoleToCollections(
    @Req() req: any,
    @Param('id') syntheticRoleId: string,
    @Body('collections') collections: string[],
  ) {
    const user = req.user as { publicKey: string };
    if (!syntheticRoleId || !collections || collections.length === 0)
      throw new HttpException(
        'invalid synthetic role id or collection',
        HttpStatus.BAD_REQUEST,
      );
    const syntheticRole =
      await this.syntheticRoleService.findSyntheticRoleUsingId(syntheticRoleId);
    if (syntheticRole === null)
      throw new HttpException('no synthetic role found', HttpStatus.NOT_FOUND);
    if (syntheticRole.creatorPublicKey !== user.publicKey) {
      throw new UnauthorizedException();
    }
    const createdCollections =
      await this.syntheticRoleService._addRolesToCollections(
        user,
        syntheticRole,
        collections,
      );
    return {
      result: createdCollections,
    };
  }

  @Post('roles/:address')
  async addSyntheticRolesToCollection(
    @Req() req: any,
    @Param('address') contract: string,
    @Body('roles') roles: string[],
  ) {
    const user = req.user as { publicKey: string };
    if (!contract || !roles || roles.length === 0)
      throw new HttpException(
        'invalid role ids or collection',
        HttpStatus.BAD_REQUEST,
      );
    const collections =
      await this.syntheticRoleService.findAllCollectionRoleByCollectionAddress(
        user.publicKey,
        contract,
      );
    if (collections.length === 0) throw new UnauthorizedException();
    const createdRoles =
      await this.syntheticRoleService.addSyntheticRolesToCollection(
        contract,
        roles,
      );
    return {
      result: createdRoles,
    };
  }

  @Get(':address')
  async findAllRolesByAddress(
    @Req() req: any,
    @Param('address') address: string,
  ) {
    return {
      result:
        await this.syntheticRoleService.findAllCollectionRoleByCollectionAddress(
          req.user.publicKey,
          address,
        ),
    };
  }

  @Get('role/:id')
  async findAllCollectionRoleByRoleId(
    @Req() req: any,
    @Param('id') id: string,
  ) {
    return {
      result:
        await this.syntheticRoleService.findAllCollectionRoleBySyntheticRoleId(
          req.user.publicKey,
          id,
        ),
    };
  }
}
