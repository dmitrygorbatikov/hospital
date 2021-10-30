import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Doctor, DoctorDocument } from './doctor.schema';
import { saveDoctorBodyDto } from './dto/save-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DoctorService {
  constructor(@InjectModel(Doctor.name) private doctorModel: Model<DoctorDocument>, private authService: AuthService) {
  }

  public create(body: saveDoctorBodyDto) {
    const patient = new this.doctorModel(body);
    return patient.save();
  }

  public findDoctorByEmail(email: string) {
    return this.doctorModel.findOne({ email }, { password: 0 }).exec();
  }

  public findDoctorById(_id: string) {
    return this.doctorModel.findById(_id).exec();
  }

  public findDoctorByIdAndUpdate(_id: string, body: UpdateDoctorDto) {
    return this.doctorModel.findByIdAndUpdate(_id, body).exec();
  }

  public checkDoctorRole() {
    // const decodeToken = this.authService.decodeToken(headers.token);
    // const { role, id } = decodeToken;
    // if (role !== RolesEnum.doctor) {
    //   return { error: ErrorsEnum.notEnoughRights };
    // }
    // const doctor = await this.doctorService.findDoctorById(id);
    // if (!doctor) {
    //   return { error: ErrorsEnum.userNotFound };
    // }
  }

}
