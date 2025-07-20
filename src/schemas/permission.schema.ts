import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '@/schemas/company.schema';
import { User } from '@/schemas/user.schema';

export enum PermissionEnum {
  READ = 'Read',
  WRITE = 'Write',
  DELETE = 'Delete',
  ADMIN = 'Admin',
}

@Schema()
export class Permission extends Document {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId!: Types.ObjectId;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  userId!: Types.ObjectId;

  @Prop({ type: String, required: true })
  resourceType!: string;

  @Prop({
    type: [String],
    enum: PermissionEnum,
    default: [],
  })
  permissions!: PermissionEnum[];
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);

PermissionSchema.index(
  { companyId: 1, name: 1, resourceType: 1 },
  { unique: true },
);
