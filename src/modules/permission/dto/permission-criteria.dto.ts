import { IsMongoId, IsNotEmpty, IsString } from 'class-validator';

export class PermissionCriteriaDto {
  @IsMongoId()
  @IsNotEmpty()
  companyId!: string;

  @IsMongoId()
  @IsNotEmpty()
  userId!: string;

  @IsString()
  @IsNotEmpty()
  resourceType!: string;
}
