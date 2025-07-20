import {
  Body,
  Controller,
  ForbiddenException,
  NotFoundException,
  Post,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { IUser } from '@/interfaces/user.type';
import { UserPolicy } from '@/policies/user.policy';
import { UserService } from '@/modules/user/user.service';
import { CompanyRepository } from '@/repositories/companny.repository';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';

@Controller('users')
export class UserController {
  constructor(
    private readonly userPolicy: UserPolicy,
    private readonly userService: UserService,
    private readonly companyRepository: CompanyRepository,
  ) {}

  /**
   * The purpose of this function is to allow the creation of users for testing
   * other application features. In a real-world scenario, we would include
   * authentication and authorization checks here, but for testing purposes,
   * those checks have been removed.
   */
  @Post()
  async create(@Req() req: Request, @Body() body: CreateUserDto) {
    const user = req.user as IUser;
    const company = await this.companyRepository.findById(body.companyId);

    if (!company) {
      throw new NotFoundException('Company not found');
    }

    const canCreate = await this.userPolicy.canCreate(user, company);

    if (!canCreate) {
      throw new ForbiddenException(
        'You do not have permission to create a company admin',
      );
    }

    const createdUser = await this.userService.create(body);

    if (!createdUser) {
      throw new Error('Failed to create a user');
    }

    // TODO: Use a resource object or transformer to format the response data properly
    const { password, ...rest } = createdUser.toObject();

    return rest;
  }
}
