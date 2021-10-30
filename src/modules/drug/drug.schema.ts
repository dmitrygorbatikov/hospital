import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type DrugDocument = Drug & Document;

@Schema()
export class Drug {
  @Prop()
  title: string;

  @Prop()
  description: string;

  @Prop()
  dateFrom: number;

  @Prop()
  dateTo: number;

  @Prop()
  doses: number;

  @Prop()
  minTemperature: number;

  @Prop()
  maxTemperature: number;

  @Prop()
  storageId: string;

  @Prop()
  registerDate: number;
}

export const DrugSchema = SchemaFactory.createForClass(Drug);