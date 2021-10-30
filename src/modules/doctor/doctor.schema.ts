import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ApiProperty } from '@nestjs/swagger'

export type DoctorDocument = Doctor & Document

@Schema()
export class Doctor {
   @Prop({
      required: true,
   })
   name: string

   @Prop({
      required: true,
   })
   surname: string

   @Prop({
      required: true,
   })
   email: string

   @Prop({
      required: true,
   })
   password: string

   @Prop({
      required: true,
   })
   bornDate: number

   @Prop({
      required: true,
   })
   img: string

   @Prop({
      required: true,
   })
   description: string

   @Prop({
      required: true,
   })
   balance: number

   @Prop({
      required: true,
   })
   costDrugs: number

   @Prop({
      required: true,
   })
   registerDate: number

   @Prop({
      required: true,
   })
   role: string
}

export const DoctorSchema = SchemaFactory.createForClass(Doctor)
