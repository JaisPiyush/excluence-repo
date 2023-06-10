import { IsBoolean, IsNotEmpty, IsOptional } from 'class-validator';
export class CreateSyntheticRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  permissions: string;

  @IsNotEmpty()
  color: string;

  @IsOptional()
  @IsBoolean()
  hoist: boolean;

  @IsOptional()
  @IsNotEmpty()
  icon: string;

  @IsOptional()
  @IsNotEmpty()
  unicode_emoji: string;

  @IsOptional()
  @IsBoolean()
  mentionable: boolean;
}
