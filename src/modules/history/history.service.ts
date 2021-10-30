import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { History, HistoryDocument } from './history.schema'
import { HistoryDrugDto } from './dto/historyDrugDto'

@Injectable()
export class HistoryService {
   constructor(
      @InjectModel(History.name) private historyModel: Model<HistoryDocument>,
   ) {}
   public create(body: HistoryDrugDto) {
      return new this.historyModel(body).save()
   }
}
