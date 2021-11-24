import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { PatientIndicatorsDto } from './dto/patientIndicatorsDto'
import { PatientDosesDto } from './dto/patientDosesDto'

export type PatientDocument = Patient & Document

@Schema()
export class Patient {
   @Prop()
   name: string

   @Prop()
   surname: string

   @Prop()
   email: string

   @Prop()
   password: string

   @Prop()
   bornDate: number

   @Prop()
   sex: string

   @Prop()
   category: string

   @Prop()
   indicators: Array<PatientIndicatorsDto>

   @Prop()
   doctorId: string

   @Prop()
   doses: PatientDosesDto

   @Prop()
   registerDate: number

   @Prop()
   role: string
}

export const PatientSchema = SchemaFactory.createForClass(Patient)
