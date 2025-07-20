import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Project } from '@/schemas/project.schema';

@ValidatorConstraint({ async: true })
@Injectable()
export class IsProjectNameUnique implements ValidatorConstraintInterface {
  constructor(
    @InjectModel(Project.name) private projectModel: Model<Project>,
  ) {}

  async validate(name: string, args: ValidationArguments) {
    const { companyId } = args.object as any;
    const project = await this.projectModel.findOne({
      name,
      companyId,
    });

    return !project;
  }

  defaultMessage(args: ValidationArguments) {
    return 'A project with this name already exists in the company.';
  }
}
