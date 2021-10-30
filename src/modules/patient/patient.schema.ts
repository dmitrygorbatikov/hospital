import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PatientDocument = Patient & Document;

@Schema()
export class Patient {
  @Prop()
  name: string;

  @Prop()
  surname: string;

  @Prop()
  email: string;

  @Prop()
  password: string;

  @Prop()
  bornDate: number;

  @Prop()
  sex: string;

  @Prop()
  category: string;

  @Prop()
  drugIds: string[];

  @Prop()
  indicators: string[];

  @Prop()
  doctorId: string;

  @Prop()
  registerDate: number;

  @Prop()
  role: string;
}

export const PatientSchema = SchemaFactory.createForClass(Patient);