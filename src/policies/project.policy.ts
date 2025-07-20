import { IUser } from '@/interfaces/user.type';
import { Injectable } from '@nestjs/common';
import { Company } from '@/schemas/company.schema';
import { PermissionEnum } from '@/schemas/permission.schema';
import { PermissionChecker } from '@/policies/permission-checker';
import { Project } from '@/schemas/project.schema';

@Injectable()
export class ProjectPolicy {
  constructor(private permissionChecker: PermissionChecker) {}

  async canCreate(user: IUser, company: Company) {
    return this.permissionChecker.checkPermission(
      user,
      company,
      Project.name,
      PermissionEnum.WRITE,
    );
  }

  async canUpdate(user: IUser, company: Company) {
    return this.permissionChecker.checkPermission(
      user,
      company,
      Project.name,
      PermissionEnum.WRITE,
    );
  }

  async canDelete(user: IUser, company: Company) {
    return this.permissionChecker.checkPermission(
      user,
      company,
      Project.name,
      PermissionEnum.DELETE,
    );
  }

  async canRead(user: IUser, company: Company) {
    return this.permissionChecker.checkPermission(
      user,
      company,
      Project.name,
      PermissionEnum.READ,
    );
  }
}
