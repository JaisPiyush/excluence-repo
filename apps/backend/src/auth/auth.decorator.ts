import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);

export const ROLE_KEY = 'role';
export const IsCreator = () => SetMetadata(ROLE_KEY, 'isCreator');
export const IsSuperUser = () => SetMetadata(ROLE_KEY, 'isSuperUser');
