import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PermissionRepository } from '@/repositories/permission.repository';
import { Permission, PermissionSchema } from '@/schemas/permission.schema';
import { CompanyRepository } from '@/repositories/companny.repository';
import { Company, CompanySchema } from '@/schemas/company.schema';
import { PermissionChecker } from '@/policies/permission-checker';
import { UserController } from '@/modules/user/user.controller';
import { UserPolicy } from '@/policies/user.policy';
import { UserService } from '@/modules/user/user.service';
import { UserRepository } from '@/repositories/user.repository';
import { User, UserSchema } from '@/schemas/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    MongooseModule.forFeature([
      { name: Permission.name, schema: PermissionSchema },
    ]),
    MongooseModule.forFeature([{ name: Company.name, schema: CompanySchema }]),
  ],
  controllers: [UserController],
  providers: [
    PermissionRepository,
    CompanyRepository,
    UserRepository,
    PermissionChecker,
    UserService,
    UserPolicy,
  ],
})
export class UserModule {}
