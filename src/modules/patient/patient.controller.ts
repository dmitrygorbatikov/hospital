import { Body, Controller, Get, Headers, Post, Put } from '@nestjs/common'
import { PatientService } from './patient.service'
import { ApiBody, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger'
import { ErrorsEnum, RolesEnum } from '../../enums/enums'
import { DoctorService } from '../doctor/doctor.service'
import { AuthService } from '../auth/auth.service'
import {
   getRandomPatientIndicators,
   getRegisterDate,
} from '../../helper/functions'
import { CreatePatientBodyDto } from './dto/createPatientBodyDto'
import { LoginPatientDto } from './dto/loginPatientDto'

@ApiTags('patient')
@Controller('user')
export class PatientController {
   constructor(
      private patientService: PatientService,
      private doctorService: DoctorService,
      private authService: AuthService,
   ) {}

   @ApiHeader({
      name: 'token',
   })
   @ApiBody({
      type: CreatePatientBodyDto,
   })
   @Post()
   public async createPatient(
      @Body() body: CreatePatientBodyDto,
      @Headers() headers,
   ) {
      try {
         const {
            name,
            surname,
            email,
            password,
            bornDate,
            sex,
            category,
            doctorId,
         } = body
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const candidatePatient = await this.patientService.findPatientByEmail(
            email,
         )
         if (candidatePatient) {
            return { error: ErrorsEnum.exist }
         }
         const hashedPassword = await this.authService.passwordHash(password)
         const patient = await this.patientService.create({
            name,
            surname,
            email,
            password: hashedPassword,
            bornDate,
            sex,
            category,
            indicators: [getRandomPatientIndicators()],
            doctorId,
            drugIds: [],
            registerDate: getRegisterDate(),
            role: RolesEnum.patient,
         })
         return { patient }
      } catch (e) {
         return { error: e.message }
      }
   }

   @ApiBody({ type: LoginPatientDto })
   @Post('/login')
   public async loginPatient(@Body() body: LoginPatientDto) {
      try {
         const { email, password } = body
         const patient = await this.patientService.findPatientByEmail(email)
         if (!patient) {
            return { error: ErrorsEnum.userNotFound }
         }
         const isMatch = await this.authService.bcryptPassword(
            password,
            patient.password,
         )
         if (!isMatch) {
            return { error: ErrorsEnum.incorrectPassword }
         }
         const { _id, name, surname, role } = patient
         return {
            token: this.authService.accessToken(_id, name, surname, role),
         }
      } catch (e) {
         return { error: e.message }
      }
   }

   @ApiHeader({
      name: 'token',
   })
   @Get()
   public async getProfilePatient(@Headers() headers) {
      try {
         const decodeToken = this.authService.decodeToken(headers.token)
         if (!decodeToken) {
            return { error: ErrorsEnum.userNotFound }
         }
         const patient = await this.patientService.findPatientById(
            decodeToken.id,
         )
         if (!patient) {
            return { error: ErrorsEnum.userNotFound }
         }

         return { patient }
      } catch (e) {
         return { error: e.message }
      }
   }

   @ApiHeader({
      name: 'token',
   })
   @Put()
   public async updatePatientStatistic(@Headers() headers) {
      try {
         const decodeToken = this.authService.decodeToken(headers.token)
         if (!decodeToken) {
            return { error: ErrorsEnum.userNotFound }
         }
         const patients = await this.patientService.getPatients()
         const indicators = []
         for (let i = 0; i < patients.length; i++) {
            indicators.push(patients[i].indicators)
            indicators[i].push(getRandomPatientIndicators())
         }
         for (let i = 0; i < indicators.length; i++) {
            await this.patientService.updatePatientStatistic(patients[i]._id, {
               indicators: indicators[i],
            })
         }
         const newPatients = await this.patientService.getPatients()

         return { patients: newPatients }
      } catch (e) {
         return { error: e.message }
      }
   }
}
