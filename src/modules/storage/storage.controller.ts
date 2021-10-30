import {
   Body,
   Controller,
   Post,
   Headers,
   Get,
   Param,
   Put,
} from '@nestjs/common'
import { StorageService } from './storage.service'
import { AuthService } from '../auth/auth.service'
import { DoctorService } from '../doctor/doctor.service'
import { ErrorsEnum } from '../../enums/enums'
import {
   ApiBody,
   ApiCreatedResponse,
   ApiHeader,
   ApiParam,
   ApiTags,
} from '@nestjs/swagger'
import { CreateStorageRequestDto } from './dto/createStorageRequestDto'
import {
   getRandomStorageIndicators,
   getRegisterDate,
} from '../../helper/functions'
import { CreateStorageServiceDto } from './dto/createStorageServiceDto'
import { StorageIndicatorsDto } from './dto/storageIndicatorsDto'

@ApiTags('storage')
@Controller('storage')
export class StorageController {
   constructor(
      private storageService: StorageService,
      private authService: AuthService,
      private doctorService: DoctorService,
   ) {}

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
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const { title, capacity } = body
         if (capacity < 100) {
            return { error: ErrorsEnum.setRightCapacity }
         }
         const storage = await this.storageService.create({
            title,
            indicators: [getRandomStorageIndicators()],
            capacity,
            filled: 0,
            registerDate: getRegisterDate(),
            doctorId: doctor._id,
         })
         return { storage }
      } catch (e) {
         return { error: e.message }
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
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const storages = await this.storageService.findByDoctorId(doctor._id)
         return { storages }
      } catch (e) {
         return { error: e.message }
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
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const storage = await this.storageService.findStorageById(params.id)
         return { storage }
      } catch (e) {
         return { error: e.message }
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
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const storages = await this.storageService.findByDoctorId(doctor._id)

         const indicators = []

         for (let i = 0; i < storages.length; i++) {
            indicators.push(storages[i].indicators)
            indicators[i].push(getRandomStorageIndicators())
         }
         for (let i = 0; i < storages.length; i++) {
            await this.storageService.updateStorageStatistic(storages[i]._id, {
               indicators: indicators[i],
            })
         }
         const newStorages = await this.storageService.findByDoctorId(
            doctor._id,
         )
         return { storages: newStorages }
      } catch (e) {
         return { error: e.message }
      }
   }
}
