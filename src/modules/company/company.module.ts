import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyRepository } from '@/repositories/companny.repository';
import { Company, CompanySchema } from '@/schemas/company.schema';
import { CompanyController } from '@/modules/company/company.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [CompanyController],
  providers: [CompanyRepository],
})
export class CompanyModule {}
