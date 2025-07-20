import 'express';
import { IUser } from '@/interfaces/rbac.interface';

declare module 'express' {
  interface Request {
    user?: IUser;
  }
}
