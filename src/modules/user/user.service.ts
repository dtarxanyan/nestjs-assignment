import { Injectable } from '@nestjs/common';
import { UserRepository } from '@/repositories/user.repository';
import { CreateUserDto } from '@/modules/user/dto/create-user.dto';
import { PermissionRepository } from '@/repositories/permission.repository';
import { User } from '@/schemas/user.schema';
import { Connection } from 'mongoose';
import { InjectConnection } from '@nestjs/mongoose';
import { Permission, PermissionEnum } from '@/schemas/permission.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly permissionRepository: PermissionRepository,
    @InjectConnection() private readonly connection: Connection,
  ) {}

  async create(data: CreateUserDto): Promise<User | null> {
    const session = await this.connection.startSession();
    let user: User | null = null;

    try {
      await session.withTransaction(async () => {
        data.password = await bcrypt.hash(data.password, 10);
        user = await this.userRepository.create(data);

        if (!user) {
          throw new Error('Failed to create a user');
        }

        const permission = await this.permissionRepository.create({
          userId: user.id,
          companyId: data.companyId,
          resourceType: Permission.name,
          permissions: [PermissionEnum.ADMIN],
        });

        if (!permission) {
          throw new Error('Failed to create a permission');
        }
      });
    } catch (error) {
      console.error(error);
    } finally {
      session.endSession();
    }

    return user;
  }
}
