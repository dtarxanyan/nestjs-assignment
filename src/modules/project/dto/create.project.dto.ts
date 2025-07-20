import {
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Validate,
} from 'class-validator';
import { IsProjectNameUnique } from '@/modules/project/validators';

export class CreateProjectDto {
  @IsString()
  @IsNotEmpty()
  companyId!: string;

  @IsString()
  @IsNotEmpty()
  @Validate(IsProjectNameUnique)
  name!: string;

  @IsString()
  @IsNotEmpty()
  status!: string;

  @IsNumber()
  priority!: number;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  tags?: string[];
}
