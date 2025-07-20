import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Company } from '@/schemas/company.schema';

@Schema()
export class Project extends Document {
  @Prop({ type: Types.ObjectId, ref: Company.name, required: true })
  companyId!: Types.ObjectId;

  @Prop({ required: true })
  name!: string;

  @Prop({ required: true })
  status!: string;

  @Prop({ required: true })
  priority!: number;

  @Prop({ required: false, default: [] })
  tags!: string[];
}

export const ProjectSchema = SchemaFactory.createForClass(Project);

ProjectSchema.index({ companyId: 1, name: 1 }, { unique: true });
