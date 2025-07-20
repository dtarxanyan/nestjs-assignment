import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import { CompanyRepository } from '@/repositories/companny.repository';
import { CreateCompanyDto } from '@/modules/company/dto/create-company.dto';

@Controller('companies')
export class CompanyController {
  constructor(private readonly companyRepository: CompanyRepository) {}

  /**
   * The purpose of this function is to allow the creation of companies for testing
   * other application features. In a real-world scenario, we would include
   * authentication and authorization checks here, but for testing purposes,
   * those checks have been removed.
   */
  @Post()
  async create(@Req() req: Request, @Body() body: CreateCompanyDto) {
    return this.companyRepository.create(body);
  }
}
