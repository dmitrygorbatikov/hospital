import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drug, DrugDocument } from './drug.schema';

@Injectable()
export class DrugService {

  constructor(
    @InjectModel(Drug.name) private drugModel: Model<DrugDocument>,
  ) {
  }

  public create(body: any) {
    return new this.drugModel(body).save();
  }

  public findById(id: string) {
    return this.drugModel.findById(id);
  }

  public findByDoctorId(doctorId: string) {
    return this.drugModel.find({ doctorId })
  }

  public findByTitle(title: string) {
    return this.drugModel.findOne({ title });
  }

  public findByStorageId(storageId: string) {
    return this.drugModel.find({ storageId });
  }

  public findByIdAndUpdate(_id: string, body: any) {
    return this.drugModel.findByIdAndUpdate(_id, body);
  }

}
