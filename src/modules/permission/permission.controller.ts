import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { SetPermissionsDto } from '@/modules/permission/dto/set-permissions.dto';
import { PermissionService } from '@/modules/permission/permission.service';
import { CompanyRepository } from '@/repositories/companny.repository';
import { PermissionPolicy } from '@/policies/permission.policy';
import { JwtAuthenticationGuard } from '@/modules/auth/jwt-authentication.guard';

@Controller('permissions')
export class PermissionController {
  constructor(
    private readonly permissionService: PermissionService,
    private readonly companyRepository: CompanyRepository,
    private readonly permissionPolicy: PermissionPolicy,
  ) {}

  @UseGuards(JwtAuthenticationGuard)
  @Put()
  async update(@Req() req: Request, @Body() body: SetPermissionsDto) {
    const company = await this.companyRepository.findById(body.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const canUpdate = await this.permissionPolicy.canUpdate(req.user, company);

    if (!canUpdate) {
      throw new ForbiddenException(
        'You have not access rights to update user permissions',
      );
    }

    const updatedPermission = await this.permissionService.update(body);

    if (!updatedPermission) {
      throw new Error('Failed to update permission');
    }

    return updatedPermission;
  }
}
