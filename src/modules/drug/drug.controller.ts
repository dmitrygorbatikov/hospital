import { Body, Controller, Headers, Param, Post, Put } from '@nestjs/common'
import { AuthService } from '../auth/auth.service'
import { DrugService } from './drug.service'
import {
   ApiBody,
   ApiCreatedResponse,
   ApiHeader,
   ApiParam,
   ApiTags,
} from '@nestjs/swagger'
import { StorageService } from '../storage/storage.service'
import { ErrorsEnum, RolesEnum } from '../../enums/enums'
import { DoctorRegisterOrLoginResponseDto } from '../auth/dto/doctor-register-or-login-response.dto'
import { getRegisterDate } from '../../helper/functions'
import { CreateDrugDto } from './dto/create-drug.dto'
import { createDoctorBodyDto } from '../doctor/dto/create-doctor.dto'
import { AddDrugDto } from './dto/add-drug.dto'

@ApiTags('drug')
@Controller('drug')
export class DrugController {
   constructor(
      private authService: AuthService,
      private drugService: DrugService,
      private storageService: StorageService,
   ) {}

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
            storageId,
         } = body
         const decodeToken = this.authService.decodeToken(headers.token)
         if (decodeToken.role !== RolesEnum.doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const candidateDrug = await this.drugService.findByTitle(title)
         if (candidateDrug) {
            return { error: 'Drug with this title already exist' }
         }
         const storage = await this.storageService.findStorageById(storageId)
         if (!storage) {
            return { error: ErrorsEnum.storageNotFound }
         }
         if (storage.capacity - storage.filled < weight * count) {
            return {
               error: `You can add only ${Math.floor(
                  (storage.capacity - storage.filled) / weight,
               )} numbers of this drug`,
            }
         }
         storage.filled += weight * count
         await storage.save()
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
            storageId,
            registerDate: getRegisterDate(),
         })

         return { drug }
      } catch (e) {
         return { error: e }
      }
   }

   @ApiHeader({
      name: 'token',
   })
   @ApiParam({
      name: 'id',
   })
   @ApiBody({ type: AddDrugDto })
   @Put()
   public async changeCountOfDrugs(
      @Body() body: AddDrugDto,
      @Param() params,
      @Headers() headers,
   ) {
      try {
         const { count } = body
         const decodeToken = this.authService.decodeToken(headers.token)
         if (decodeToken.role !== RolesEnum.doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const drug = await this.drugService.findById(params.id)
         if (!drug) {
            return { error: 'Drug not found' }
         }
         if (count > 0 && drug.count < count) {
            return {
               error: `You don't give out count of drug less than ${drug.count} `,
            }
         }
         const storage = await this.storageService.findStorageById(
            drug.storageId,
         )
         if (!storage) {
            return { error: 'Storage not found' }
         }
         if (storage.capacity - storage.filled < count * drug.weight) {
            return {
               error: `You can add only ${Math.floor(
                  (storage.capacity - storage.filled) / drug.weight,
               )} numbers of this drug`,
            }
         }
         storage.filled += count * drug.weight
         await storage.save()
         drug.count += count
         await drug.save()
         return { drug }
      } catch (e) {
         return { error: e }
      }
   }
}
