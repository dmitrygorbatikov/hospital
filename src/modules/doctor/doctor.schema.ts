import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type DoctorDocument = Doctor & Document;

@Schema()
export class Doctor {
  @ApiProperty()
  @Prop({
    required: true,
  })
  name: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  surname: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  email: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  password: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  bornDate: number;

  @ApiProperty()
  @Prop({
    required: true,
  })
  img: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  description: string;

  @ApiProperty()
  @Prop({
    required: true,
  })
  registerDate: number;

  @ApiProperty()
  @Prop({
    required: true,
  })
  role: string;
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor);