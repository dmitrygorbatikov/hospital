import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Patient, PatientDocument } from './patient.schema';
import { SavePatientServiceDto } from './dto/savePatientServiceDto';
import { PatientIndicatorsDto } from './dto/patientIndicatorsDto';

@Injectable()
export class PatientService {
  constructor(
    @InjectModel(Patient.name) private patientModel: Model<PatientDocument>,
  ) {
  }

  public create(body: SavePatientServiceDto) {
    const patient = new this.patientModel(body);
    return patient.save();
  }

  public getPatientsByDoctorId(doctorId: string) {
    return this.patientModel.find({ doctorId });
  }


  public findPatientByEmail(email: string) {
    return this.patientModel.findOne({ email });
  }

  public findPatientById(_id: string) {
    return this.patientModel.findById(_id);
  }

  public updatePatientStatistic(
    _id: string,
    body: { indicators: PatientIndicatorsDto[] },
  ) {
    return this.patientModel.findByIdAndUpdate(_id, body);
  }

  public updateUserProfile(_id, body) {
    return this.patientModel.findByIdAndUpdate(_id, body);
  }
}
