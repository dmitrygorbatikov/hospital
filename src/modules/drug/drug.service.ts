import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Drug, DrugDocument } from './drug.schema'
import { CreateDrugDto } from './dto/create-drug.dto'

@Injectable()
export class DrugService {
   constructor(
      @InjectModel(Drug.name) private drugModel: Model<DrugDocument>,
   ) {}

   public create(body: CreateDrugDto) {
      return new this.drugModel(body).save()
   }

   public findById(id: string) {
      return this.drugModel.findById(id)
   }
   public findByTitle(title: string) {
      return this.drugModel.findOne({ title })
   }
}
