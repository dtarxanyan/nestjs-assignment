import {
  Body,
  Controller,
  ForbiddenException,
  Get,
  NotFoundException,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthenticationGuard } from '@/modules/auth/jwt-authentication.guard';
import { CreateProjectDto } from '@/modules/project/dto/create.project.dto';
import { ProjectPolicy } from '@/policies/project.policy';
import { Request } from 'express';
import { IUser } from '@/interfaces/user.type';
import { CompanyRepository } from '@/repositories/companny.repository';
import { ProjectRepository } from '@/repositories/project.repository';
import { UpdateProjectDto } from '@/modules/project/dto/update.project.dto';
import { Company } from '@/schemas/company.schema';

@Controller('projects')
export class ProjectController {
  constructor(
    private readonly projectPolicy: ProjectPolicy,
    private readonly companyRepository: CompanyRepository,
    private readonly projectRepository: ProjectRepository,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Post()
  async create(@Req() req: Request, @Body() body: CreateProjectDto) {
    const user = req.user as IUser;
    const company = await this.companyRepository.findById(body.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const canCreate = await this.projectPolicy.canCreate(user, company);

    if (!canCreate) {
      throw new ForbiddenException(
        'You do not have permission to create a project',
      );
    }

    return this.projectRepository.create(body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Patch(':id')
  async update(@Req() req: Request, @Body() body: UpdateProjectDto) {
    const user = req.user as IUser;
    const projectId = req.params.id;
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const company = (await this.companyRepository.findById(
      project.companyId.toString(),
    )) as Company;

    const canUpdate = await this.projectPolicy.canUpdate(user, company);

    if (!canUpdate) {
      throw new ForbiddenException(
        'You do not have permission to update this project',
      );
    }

    return this.projectRepository.update(projectId, body);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get()
  async list(@Req() req: Request) {
    const user = req.user as IUser;

    return this.projectRepository.findReadableProjects(user.id);
  }

  @UseGuards(JwtAuthenticationGuard)
  @Get(':id')
  async view(@Req() req: Request) {
    const user = req.user as IUser;
    const projectId = req.params.id;
    const project = await this.projectRepository.findById(projectId);

    if (!project) {
      throw new NotFoundException('Project not found');
    }

    const company = (await this.companyRepository.findById(
      project.companyId.toString(),
    )) as Company;

    const canRead = await this.projectPolicy.canRead(user, company);

    if (!canRead) {
      throw new ForbiddenException(
        'You do not have permission to update this project',
      );
    }

    return this.projectRepository.findById(projectId);
  }
}
