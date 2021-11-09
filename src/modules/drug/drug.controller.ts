import { Body, Controller, Get, Headers, Param, Post, Put, Query } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DrugService } from './drug.service';
import { ApiBody, ApiCreatedResponse, ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StorageService } from '../storage/storage.service';
import { DrugEnum, ErrorsEnum, RolesEnum } from '../../enums/enums';
import { DoctorRegisterOrLoginResponseDto } from '../auth/dto/doctor-register-or-login-response.dto';
import { getRegisterDate } from '../../helper/functions';
import { CreateDrugDto } from './dto/create-drug.dto';
import { AddDrugDto } from './dto/add-drug.dto';
import { DoctorService } from '../doctor/doctor.service';
import { HistoryService } from '../history/history.service';
import { PatientService } from '../patient/patient.service';

@ApiTags('drug')
@Controller('drug')
export class DrugController {
  constructor(
    private authService: AuthService,
    private drugService: DrugService,
    private storageService: StorageService,
    private doctorService: DoctorService,
    private historyService: HistoryService,
    private patientService: PatientService,
  ) {
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Лекарство добавлено успешно',
    type: DoctorRegisterOrLoginResponseDto,
  })
  @ApiHeader({
    name: 'token',
  })
  @ApiBody({ type: CreateDrugDto })
  @Post()
  public async addDrugToStorage(
    @Body() body: CreateDrugDto,
    @Headers() headers,
  ) {
    try {
      const {
        title,
        description,
        dateFrom,
        dateTo,
        count,
        weight,
        price,
        minTemperature,
        maxTemperature,
        maxHumidity,
        minHumidity,
        storageId,
      } = body;
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const candidateDrug = await this.drugService.findByTitle(title);
      if (candidateDrug) {
        return { error: 'Drug with this title already exist' };
      }
      const storage = await this.storageService.findStorageById(storageId);
      if (!storage) {
        return { error: ErrorsEnum.storageNotFound };
      }
      if (storage.capacity - storage.filled < weight * count) {
        return {
          error: `You can add only ${Math.floor(
            (storage.capacity - storage.filled) / weight,
          )} numbers of this drug`,
        };
      }
      storage.filled += weight * count;
      await storage.save();
      const drug = await this.drugService.create({
        title,
        description,
        dateFrom,
        dateTo,
        count,
        weight,
        price,
        minTemperature,
        maxTemperature,
        maxHumidity,
        minHumidity,
        storageId,
        doctorId: doctor._id,
        registerDate: getRegisterDate(),
      });

      const money = drug.count * drug.price;

      await this.historyService.create({
        type: DrugEnum.add,
        money,
        drugTitle: drug.title,
        drugId: drug._id,
        countDrugs: drug.count,
        doctorName: doctor.name,
        doctorSurName: doctor.surname,
        doctorId: doctor._id,
        registerDate: getRegisterDate(),
      });
      doctor.costDrugs += money;
      await doctor.save();

      return { drug };
    } catch (e) {
      return { error: e };
    }
  }

  @ApiHeader({
    name: 'token',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiBody({ type: AddDrugDto })
  @Put('/get-new-drug/:id')
  public async getNewDrug(
    @Body() body: AddDrugDto,
    @Param() params,
    @Headers() headers,
  ) {
    try {
      const { count, dateTo, dateFrom } = body;
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const drug = await this.drugService.findById(params.id);
      if (!drug) {
        return { error: 'Drug not found' };
      }
      if (count < 0) {
        return { error: 'Count can not be less than 0' };
      }
      const storage = await this.storageService.findStorageById(
        drug.storageId,
      );
      if (!storage) {
        return { error: 'Storage not found' };
      }
      if (storage.capacity - storage.filled < count * drug.weight) {
        return {
          error: `You can add only ${Math.floor(
            (storage.capacity - storage.filled) / drug.weight,
          )} numbers of this drug`,
        };
      }
      storage.filled += count * drug.weight;
      await storage.save();
      drug.count += count;
      if (dateTo) {
        drug.dateTo = dateTo;
      }
      if (dateFrom) {
        drug.dateFrom = dateFrom;
      }
      await drug.save();

      const money = count * drug.price;

      await this.historyService.create({
        type: DrugEnum.add,
        money,
        drugTitle: drug.title,
        drugId: drug._id,
        countDrugs: drug.count,
        doctorName: doctor.name,
        doctorSurName: doctor.surname,
        doctorId: doctor._id,
        registerDate: getRegisterDate(),
      });
      doctor.costDrugs += money;
      await doctor.save();
      return { drug };
    } catch (e) {
      return { error: e };
    }
  }

  @ApiHeader({
    name: 'token',
  })
  @ApiParam({
    name: 'id',
  })
  @ApiQuery({
    name: 'patientId',
  })
  @ApiBody({ type: AddDrugDto })
  @Put('/give-out-drug/:id')
  public async giveOutDrug(
    @Body() body: AddDrugDto,
    @Param() params,
    @Headers() headers,
    @Query() query,
  ) {
    try {
      const { count } = body;
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const drug = await this.drugService.findById(params.id);
      if (!drug) {
        return { error: 'Drug not found' };
      }
      if (count > 0) {
        return { error: 'Count must be less than 0' };
      }
      const storage = await this.storageService.findStorageById(
        drug.storageId,
      );
      if (!storage) {
        return { error: 'Storage not found' };
      }
      if (storage.filled < count * drug.weight) {
        return {
          error: `You can't give out count of drugs more than it is in storage`,
        };
      }
      storage.filled += count * drug.weight;
      await storage.save();
      drug.count += count;
      await drug.save();

      const patient = await this.patientService.findPatientById(
        query.patientId,
      );
      if (!patient) {
        return { error: ErrorsEnum.userNotFound };
      }

      const money = count * drug.price;

      await this.historyService.create({
        type: DrugEnum.add,
        money,
        drugTitle: drug.title,
        drugId: drug._id,
        countDrugs: drug.count,
        doctorName: doctor.name,
        doctorSurName: doctor.surname,
        doctorId: doctor._id,
        patientName: patient.name,
        patientId: query.patientId,
        patientSurName: patient.surname,
        registerDate: getRegisterDate(),
      });
      doctor.costDrugs += money;
      doctor.balance += money * -1;
      await doctor.save();

      return { drug };
    } catch (e) {
      return { error: e };
    }
  }

  @ApiHeader({
    name: 'token',
  })
  @ApiParam({
    name: 'id',
  })
  @Get('/:id')
  public async getDrugsByStorage(@Headers() headers, @Param() params) {
    try {
      const { id } = params;
      const doctor = await this.doctorService.checkDoctorRole(headers.token);
      if (!doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }

      const storage = await this.storageService.findStorageById(id);
      if (!storage) {
        return { error: ErrorsEnum.storageNotFound };
      }
      const drugs = await this.drugService.findByStorageId(id);
      return { drugs };
    } catch (e) {
      return { error: e };
    }
  }

  @ApiHeader({
    name: 'token',
  })
  @Get()
  public async checkShelfLife(@Headers() headers) {
    try {
      const decodeToken = this.authService.decodeToken(headers.token);
      if (!decodeToken) {
        return { error: ErrorsEnum.userNotFound };
      }
      const doctor = await this.doctorService.findDoctorById(decodeToken.id);
      if (!doctor || doctor.role !== RolesEnum.doctor) {
        return { error: ErrorsEnum.userNotFound };
      }
      const drugs = await this.drugService.findByDoctorId(doctor._id);
      const expiredMedicines = [];
      for (let i = 0; i < drugs.length; i++) {
        if (expiredMedicines[i].dateTo - parseInt(getRegisterDate().toString()) > 0 && expiredMedicines[i].dateTo - parseInt(getRegisterDate().toString()) < 60 * 60 * 24 * 1000) {
          expiredMedicines.push({
            drug: drugs[i],
            message: 'Срок годности истекает менее чем через 3 дня',
            status: 'soon',
          });
        } else if (expiredMedicines[i].dateTo < parseInt(getRegisterDate().toString())) {
          expiredMedicines.push({
            drug: drugs[i],
            message: 'Срок годности уже истёк',
            status: 'expired',
          });
        } else {
          expiredMedicines.push({
            drug: drugs[i],
            message: 'Срок годности в подярдке',
            status: 'normal',
          });
        }
      }
      return { drugs: expiredMedicines };
    } catch (e) {
      return { error: e.message };
    }
  }
}
