import { Injectable } from '@nestjs/common';
import { PermissionRepository } from '@/repositories/permission.repository';
import { Permission } from '@/schemas/permission.schema';
import { SetPermissionsDto } from '@/modules/permission/dto/set-permissions.dto';

@Injectable()
export class PermissionService {
  constructor(private readonly permissionRepository: PermissionRepository) {}

  async update(data: SetPermissionsDto): Promise<Permission | null> {
    return this.permissionRepository.updateOrCreate(data);
  }
}
