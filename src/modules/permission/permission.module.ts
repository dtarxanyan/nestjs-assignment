import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository } from '@/repositories/companny.repository';
import { Company, CompanySchema } from '@/schemas/company.schema';
import { PermissionController } from '@/modules/permission/permission.controller';
import { PermissionService } from '@/modules/permission/permission.service';
import { PermissionPolicy } from '@/policies/permission.policy';
import { PermissionRepository } from '@/repositories/permission.repository';
import { Permission, PermissionSchema } from '@/schemas/permission.schema';
import { PermissionChecker } from '@/policies/permission-checker';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
  ],
  controllers: [PermissionController],
  providers: [
    CompanyRepository,
    PermissionChecker,
    PermissionRepository,
    PermissionService,
    PermissionPolicy,
  ],
})
export class PermissionModule {}
