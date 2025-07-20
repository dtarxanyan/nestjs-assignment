import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Company } from '@/schemas/company.schema';
import { CreateCompanyDto } from '@/modules/company/dto/create-company.dto';

@Injectable()
export class CompanyRepository {
  constructor(
    @InjectModel(Company.name) private companyModel: Model<Company>,
  ) {}

  async findById(id: string): Promise<Company | null> {
    return this.companyModel.findById(id).exec();
  }

  async create(data: CreateCompanyDto): Promise<Company | null> {
    return this.companyModel.create(data);
  }
}
