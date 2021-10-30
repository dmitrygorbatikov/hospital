import { Body, Controller, Headers, Post } from '@nestjs/common';
import { AuthService } from '../auth/auth.service';
import { DrugService } from './drug.service';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { StorageService } from '../storage/storage.service';
import { ErrorsEnum, RolesEnum } from '../../enums/enums';
import { DoctorRegisterOrLoginResponseDto } from '../auth/dto/doctor-register-or-login-response.dto';

@ApiTags('drug')
@Controller('drug')
export class DrugController {
  constructor(private authService: AuthService, private drugService: DrugService, private storageService: StorageService) {
  }

  @ApiCreatedResponse({
    status: 201,
    description: 'Лекарство добавлено успешно',
    type: DoctorRegisterOrLoginResponseDto,
  })
  @Post()
  public async addDrugToStorage(@Body() body, @Headers() headers) {
    try {
      const {
        title,
        description,
        dateFrom,
        dateTo,
        doses,
        minTemperature,
        maxTemperature,
        storageId,
      } = body;
      const decodeToken = this.authService.decodeToken(headers.token);
      if (decodeToken.role !== RolesEnum.doctor) {
        return { error: ErrorsEnum.notEnoughRights };
      }
      const storage = this.storageService.findStorageById(storageId);
      if (!storage) {
        return { error: ErrorsEnum.storageNotFound };
      }
      const drug = this.drugService.add({
        title,
        description,
        dateFrom,
        dateTo,
        doses,
        minTemperature,
        maxTemperature,
        storageId,
        registerDate: Date.now(),
      });

      return { drug };
    } catch
      (e) {
      return { error: e };
    }
  }
}
