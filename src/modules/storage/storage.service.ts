import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Storage, StorageDocument } from './storage.schema'
import { CreateStorageServiceDto } from './dto/createStorageServiceDto'
import { StorageIndicatorsDto } from './dto/storageIndicatorsDto'

@Injectable()
export class StorageService {
   constructor(
      @InjectModel(Storage.name) private storageModel: Model<StorageDocument>,
   ) {}

   public findStorageById(_id: string) {
      return this.storageModel.findById(_id).exec()
   }

   public create(body: CreateStorageServiceDto) {
      const storage = new this.storageModel(body)
      return storage.save()
   }

   public findByDoctorId(doctorId: string) {
      return this.storageModel.find({ doctorId })
   }
   public updateStorageStatistic(
      _id: string,
      body: { indicators: StorageIndicatorsDto[] },
   ) {
      return this.storageModel.findByIdAndUpdate(_id, body)
   }
}
