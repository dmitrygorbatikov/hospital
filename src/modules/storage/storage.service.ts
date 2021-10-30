import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Storage, StorageDocument } from './storage.schema';

@Injectable()
export class StorageService {
  constructor(@InjectModel(Storage.name) private storageModel: Model<StorageDocument>) {
  }

  public findStorageById(_id: string) {
    return this.storageModel.findById(_id).exec();
  }
}
