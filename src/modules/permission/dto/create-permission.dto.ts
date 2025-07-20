import {
  IsArray,
  IsEnum,
  IsMongoId,
  IsNotEmpty,
  IsString,
} from 'class-validator';
import { PermissionEnum } from '@/schemas/permission.schema';

export class CreatePermissionDto {
  @IsMongoId()
  @IsNotEmpty()
  companyId!: string;

  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  resourceType!: string;

  @IsArray()
  @IsEnum(PermissionEnum, { each: true })
  permissions!: PermissionEnum[];
}
