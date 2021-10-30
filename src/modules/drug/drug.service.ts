import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Drug, DrugDocument } from './drug.schema';
import { CreateDrugDto } from './dto/create-drug.dto';

@Injectable()
export class DrugService {
  constructor(@InjectModel(Drug.name) private drugModel: Model<DrugDocument>) {
  }

  public add(body: CreateDrugDto) {
    return new this.drugModel(body).save();
  }
}
