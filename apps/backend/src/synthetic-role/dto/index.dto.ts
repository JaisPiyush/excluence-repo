import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
} from 'class-validator';
export class CreateSyntheticRoleDto {
  @IsNotEmpty()
  name: string;

  @IsNumberString()
  permissions: string;

  @IsNumber()
  color: number;

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
