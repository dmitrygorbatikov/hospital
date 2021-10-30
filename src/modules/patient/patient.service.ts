import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './patient.schema';

@Injectable()
export class PatientService {
  constructor(@InjectModel(Patient.name) private patientModel: Model<PatientDocument>) {
  }

  public create(body: any) {
    const patient = new this.patientModel(body);
    return patient.save();
  }

  public async getPatients() {
    return this.patientModel.find().exec();
  }

  public findPatientByEmail(email: string) {
    return this.patientModel.findOne({ email }).exec();
  }
}
