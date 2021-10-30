import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

export type HistoryDocument = History & Document

@Schema()
export class History {
   @Prop()
   money: number

   @Prop()
   type: string

   @Prop()
   drugTitle: string

   @Prop()
   drugId: string

   @Prop()
   countDrugs: number

   @Prop()
   doctorId: string

   @Prop()
   doctorName: string

   @Prop()
   doctorSurName: string

   @Prop()
   patientName?: string

   @Prop()
   patientSurName?: string

   @Prop()
   patientId?: string

   @Prop()
   registerDate: number
}

export const HistorySchema = SchemaFactory.createForClass(History)
