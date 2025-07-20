import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/modules/auth/auth.module';
import { ProjectModule } from '@/modules/project/project.module';
import { UserModule } from '@/modules/user/user.module';
import { CompanyModule } from '@/modules/company/company.module';
import { PermissionModule } from '@/modules/permission/permission.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGO_URI as string),
    AuthModule,
    ProjectModule,
    UserModule,
    CompanyModule,
    PermissionModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
