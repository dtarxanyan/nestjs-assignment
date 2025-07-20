import { IUser } from '@/interfaces/user.type';
import { Injectable } from '@nestjs/common';
import { Company } from '@/schemas/company.schema';
import { Permission, PermissionEnum } from '@/schemas/permission.schema';
import { PermissionChecker } from '@/policies/permission-checker';

@Injectable()
export class PermissionPolicy {
  constructor(private permissionChecker: PermissionChecker) {}

  async canUpdate(user: IUser, company: Company) {
    return this.permissionChecker.checkPermission(
      user,
      company,
      Permission.name,
      PermissionEnum.ADMIN,
    );
  }
}
