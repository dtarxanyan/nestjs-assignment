import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission } from '@/schemas/permission.schema';
import { CreatePermissionDto } from '@/modules/permission/dto/create-permission.dto';
import { PermissionCriteriaDto } from '@/modules/permission/dto/permission-criteria.dto';
import { SetPermissionsDto } from '@/modules/permission/dto/set-permissions.dto';

@Injectable()
export class PermissionRepository {
  constructor(
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async findOneByCriteria(
    criteria: PermissionCriteriaDto,
  ): Promise<Permission | null> {
    return this.permissionModel.findOne(criteria);
  }

  async create(data: CreatePermissionDto): Promise<Permission | null> {
    return this.permissionModel.create(data);
  }

  async updateOrCreate(data: SetPermissionsDto): Promise<Permission | null> {
    return this.permissionModel.findOneAndUpdate(
      {
        userId: data.userId,
        companyId: data.companyId,
        resourceType: data.resourceType,
      },
      { $set: data },
      { upsert: true, new: true },
    ) as Promise<Permission | null>;
  }
}
