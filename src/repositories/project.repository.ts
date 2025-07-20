import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '@/schemas/project.schema';
import { CreateProjectDto } from '@/modules/project/dto/create.project.dto';
import { UpdateProjectDto } from '@/modules/project/dto/update.project.dto';
import { Permission, PermissionEnum } from '@/schemas/permission.schema';

@Injectable()
export class ProjectRepository {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
    @InjectModel(Permission.name) private permissionModel: Model<Permission>,
  ) {}

  async findById(id: string): Promise<Project | null> {
    return this.projectModel.findById(id).exec();
  }

  async create(data: CreateProjectDto): Promise<Project | null> {
    return this.projectModel.create(data);
  }

  async update(id: string, data: UpdateProjectDto): Promise<Project | null> {
    return this.projectModel.findByIdAndUpdate(id, data, { new: true });
  }

  async findReadableProjects(userId: string): Promise<Project[]> {
    const permissionDocs = await this.permissionModel.find({
      userId: userId,
      permissions: { $in: [PermissionEnum.READ] },
    });

    const allowedCompanyIds = permissionDocs.map((p) => p.companyId);

    return this.projectModel.find({
      companyId: { $in: allowedCompanyIds },
    });
  }
}
