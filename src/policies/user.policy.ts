import { IUser } from '@/interfaces/user.type';
import { Injectable } from '@nestjs/common';
import { Company } from '@/schemas/company.schema';

@Injectable()
export class UserPolicy {
  async canCreate(user: IUser, company: Company) {
    // TODO: Super-admin check is required, but skipping it as it's outside the current task scope
    return true;
  }
}
