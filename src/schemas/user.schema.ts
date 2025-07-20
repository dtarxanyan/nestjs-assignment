import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '@/schemas/company.schema';

@Schema()
export class User extends Document {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: false })
  password?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
