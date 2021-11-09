import { Body, Controller, Get, Headers, Param, Post, Put } from '@nestjs/common';
import { StorageService } from './storage.service';
import { AuthService } from '../auth/auth.service';
import { DoctorService } from '../doctor/doctor.service';
import { DrugEnum, ErrorsEnum, RolesEnum } from '../../enums/enums';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger';
import { CreateStorageRequestDto } from './dto/createStorageRequestDto';
import { getRandomStorageIndicators, getRegisterDate } from '../../helper/functions';
import { CreateStorageServiceDto } from './dto/createStorageServiceDto';
import { StorageIndicatorsDto } from './dto/storageIndicatorsDto';
import { PatientService } from '../patient/patient.service';
import { DrugService } from '../drug/drug.service';
import { HistoryService } from '../history/history.service';

@ApiTags('storage')
@Controller('storage')
export class StorageController {
  constructor(
    private storageService: StorageService,
    private authService: AuthService,
    private doctorService: DoctorService,
    private patientService: PatientService,
    private drugService: DrugService,
    private historyService: HistoryService,
  ) {
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Storage crated successfully',
    type: CreateStorageServiceDto,
  })
  @ApiHeader({
    name: 'token',
  })
  @ApiBody({ type: CreateStorageRequestDto })
  @Post()
  public async createStorage(
    @Body() body: CreateStorageRequestDto,
    @Headers() headers,
  ) {
    try {
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const { title, capacity } = body;
      if (capacity < 100) {
        return { error: ErrorsEnum.setRightCapacity };
      }
      const storage = await this.storageService.create({
        title,
        indicators: [getRandomStorageIndicators()],
        capacity,
        filled: 0,
        registerDate: getRegisterDate(),
        doctorId: doctor._id,
      });
      return { storage };
    } catch (e) {
      return { error: e.message };
    }
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Array of storages',
    type: CreateStorageServiceDto,
    isArray: true,
  })
  @ApiHeader({
    name: 'token',
  })
  @Get()
  public async getAllStorages(@Headers() headers) {
    try {
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const storages = await this.storageService.findByDoctorId(doctor._id);
      return { storages };
    } catch (e) {
      return { error: e.message };
    }
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Storage by Id',
    type: CreateStorageServiceDto,
    isArray: false,
  })
  @ApiHeader({
    name: 'token',
  })
  @ApiParam({
    name: 'id',
  })
  @Get('/:id')
  public async getStorageById(@Headers() headers, @Param() params) {
    try {
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const storage = await this.storageService.findStorageById(params.id);
      return { storage };
    } catch (e) {
      return { error: e.message };
    }
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Update storage statistic',
    type: StorageIndicatorsDto,
    isArray: true,
  })
  @ApiHeader({
    name: 'token',
  })
  @Put('/update-statistic')
  public async updateStorageStatistic(@Headers() headers) {
    try {
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const storages = await this.storageService.findByDoctorId(doctor._id);

      const indicators = [];

      for (let i = 0; i < storages.length; i++) {
        indicators.push(storages[i].indicators);
        indicators[i].push(getRandomStorageIndicators());
      }
      for (let i = 0; i < storages.length; i++) {
        await this.storageService.updateStorageStatistic(storages[i]._id, {
          indicators: indicators[i],
        });
      }
      const newStorages = await this.storageService.findByDoctorId(
        doctor._id,
      );
      return { storages: newStorages };
    } catch (e) {
      return { error: e.message };
    }
  }

  @ApiHeader({
    name: 'token',
  })
  @ApiParam({
    name: 'storageId',
  })
  @Put('/:storageId')
  public async giveDrugsByDoses(@Headers() headers, @Param() params) {
    try {
      const { storageId } = params;
      const decodeToken = this.authService.decodeToken(headers.token);
      if (!decodeToken) {
        return { error: ErrorsEnum.userNotFound };
      }
      const doctor = await this.doctorService.findDoctorById(decodeToken.id);
      if (!doctor || doctor.role !== RolesEnum.doctor) {
        return { error: ErrorsEnum.userNotFound };
      }
      const storage = await this.storageService.findStorageById(storageId);
      if (!storage || storage.doctorId != doctor._id) {
        return { error: ErrorsEnum.storageNotFound };
      }

      const patients = await this.patientService.getPatientsByDoctorId(doctor._id);
      const arrayDoses = [];
      for (let i = 0; i < patients.length; i++) {
        if (patients[i].doses.dose !== 0) {
          arrayDoses.push({
            patientId: patients[i]._id,
            dose: patients[i].doses.dose,
            drugId: patients[i].doses.drugId,
          });
        }
      }

      const result = arrayDoses.reduce(function(r, o) {
        if (r[o.drugId]) {
          ++r[o.drugId].count;
          r[o.drugId].dose += Number(o.dose);
        } else {
          r[o.drugId] = { count: 1, dose: Number(o.dose) };
        }
        return r;
      }, {});
      const result2 = Object.keys(result).map((key) => [{ dose: result[key].dose, drugId: key }]);
      const arrayOfDrugIdsAndDoses = [];
      for (let i = 0; i < result2.length; i++) {
        arrayOfDrugIdsAndDoses.push(result2[i][0]);
      }
      let sum = 0;
      for (let i = 0; i < arrayOfDrugIdsAndDoses.length; i++) {
        sum += arrayOfDrugIdsAndDoses[i].dose;
      }
      if (storage.filled < sum) {
        return { error: 'Sum can not be more that storage filled' };
      }
      for (let i = 0; i < arrayOfDrugIdsAndDoses.length; i++) {
        await this.drugService.findById(arrayOfDrugIdsAndDoses[i].drugId).then((res) => {
          if (!res || res.storageId !== storage._id || res.count * res.weight < arrayOfDrugIdsAndDoses[i].dose) {
            return { error: 'Drug not found at this storage' };
          }
        });
      }

      for (let i = 0; i < arrayOfDrugIdsAndDoses.length; i++) {
        await this.drugService.findById(arrayOfDrugIdsAndDoses[i].drugId).then(async (res) => {
          await this.drugService.findByIdAndUpdate(res._id, { count: res.count - arrayOfDrugIdsAndDoses[i].dose / res.weight });
        });
      }
      storage.filled -= sum;
      await storage.save();

      for (let i = 0; i < arrayDoses.length; i++) {
        await this.drugService.findById(arrayOfDrugIdsAndDoses[i].drugId).then(async (res) => {
          const patient = await this.patientService.findPatientById(arrayDoses[i].patientId);
          const money = (arrayDoses[i].dose / res.weight) * res.price;
          await this.historyService.create({
            type: DrugEnum.giveOut,
            money,
            drugTitle: res.title,
            drugId: res._id,
            countDrugs: res.count,
            doctorName: doctor.name,
            doctorSurName: doctor.surname,
            doctorId: doctor._id,
            patientName: patient.name,
            patientId: arrayDoses[i].patientId,
            patientSurName: patient.surname,
            registerDate: getRegisterDate(),
          });
        });
      }
      return { message: 'Models updated' };
    } catch
      (e) {
      return { error: e };
    }
  }
}
