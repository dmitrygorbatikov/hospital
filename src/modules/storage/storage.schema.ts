import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { StorageIndicatorsDto } from './dto/storageIndicatorsDto'

export type StorageDocument = Storage & Document

@Schema()
export class Storage {
   @Prop()
   title: string

   @Prop()
   indicators: Array<StorageIndicatorsDto>

   @Prop()
   capacity: number

   @Prop({
      default: 0,
   })
   filled: number

   @Prop()
   registerDate: number

   @Prop()
   doctorId: string
}

export const StorageSchema = SchemaFactory.createForClass(Storage)
