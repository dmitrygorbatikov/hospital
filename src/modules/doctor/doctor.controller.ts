import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common'
import { DoctorService } from './doctor.service'
import { AuthService } from '../auth/auth.service'
import { ErrorsEnum, RolesEnum } from '../../enums/enums'
import { ApiBody, ApiHeader, ApiResponse, ApiTags } from '@nestjs/swagger'
import { Doctor } from './doctor.schema'
import { UpdateDoctorDto } from './dto/update-doctor.dto'

@ApiTags('doctor')
@Controller('doctor')
export class DoctorController {
   constructor(
      private doctorService: DoctorService,
      private authService: AuthService,
   ) {}

   @ApiResponse({
      status: 200,
      description: 'Получение профиля',
      type: Doctor,
   })
   @ApiHeader({
      name: 'token',
   })
   @Get()
   public async getDoctorProfile(@Headers() headers) {
      try {
         const decodeToken = this.authService.decodeToken(headers.token)
         const { role, id } = decodeToken
         if (role !== RolesEnum.doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const doctor = await this.doctorService.findDoctorById(id)
         if (!doctor) {
            return { error: ErrorsEnum.userNotFound }
         }
         return { doctor }
      } catch (e) {
         return { error: e.message }
      }
   }

   @ApiHeader({
      name: 'token',
   })
   @ApiBody({
      type: UpdateDoctorDto,
   })
   @Put()
   public async updateDoctorProfile(
      @Headers() headers,
      @Body() body: UpdateDoctorDto,
   ) {
      try {
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.userNotFound }
         }

         await this.doctorService.findDoctorByIdAndUpdate(doctor._id, body)
         return { message: 'Данные обновлены' }
      } catch (e) {
         return { error: e.message }
      }
   }
}
