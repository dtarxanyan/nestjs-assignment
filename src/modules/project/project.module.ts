import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProjectController } from '@/modules/project/project.controller';
import { Project, ProjectSchema } from '@/schemas/project.schema';
import { ProjectRepository } from '@/repositories/project.repository';
import { ProjectPolicy } from '@/policies/project.policy';
import { PermissionRepository } from '@/repositories/permission.repository';
import { Permission, PermissionSchema } from '@/schemas/permission.schema';
import { CompanyRepository } from '@/repositories/companny.repository';
import { Company, CompanySchema } from '@/schemas/company.schema';
import { PermissionChecker } from '@/policies/permission-checker';
import { IsProjectNameUnique } from '@/modules/project/validators';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Project.name, schema: ProjectSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [ProjectController],
  providers: [
    ProjectRepository,
    PermissionRepository,
    CompanyRepository,
    PermissionChecker,
    ProjectPolicy,
    IsProjectNameUnique,
  ],
  exports: [IsProjectNameUnique],
})
export class ProjectModule {}
