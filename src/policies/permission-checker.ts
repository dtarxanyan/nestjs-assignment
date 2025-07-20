import { IUser } from '@/interfaces/user.type';
import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@/repositories/permission.repository';
import { Company } from '@/schemas/company.schema';
import { PermissionEnum } from '@/schemas/permission.schema';

@Injectable()
export class PermissionChecker {
  constructor(private permissionRepository: PermissionRepository) {}

  async checkPermission(
    user: IUser,
    company: Company,
    resourceType: string,
    permission: PermissionEnum,
  ) {
    const permissionData = await this.permissionRepository.findOneByCriteria({
      userId: user.id,
      companyId: company.id,
      resourceType: resourceType,
    });

    if (!permissionData) {
      return false;
    }

    return permissionData.permissions.includes(permission);
  }
}
