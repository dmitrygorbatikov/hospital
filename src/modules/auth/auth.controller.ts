import { Body, Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { DoctorService } from '../doctor/doctor.service'
import { PatientService } from '../patient/patient.service'
import { ApiBody, ApiCreatedResponse, ApiTags } from '@nestjs/swagger'
import { DoctorRegisterOrLoginResponseDto } from './dto/doctor-register-or-login-response.dto'
import { LoginDoctorDto } from './dto/login-doctor.dto'
import { ErrorsEnum, RolesEnum } from '../../enums/enums'
import { createDoctorBodyDto } from '../doctor/dto/create-doctor.dto'
import { getRegisterDate } from '../../helper/functions'

@ApiTags('auth')
@Controller('auth')
export class AuthController {
   constructor(
      private authService: AuthService,
      private doctorService: DoctorService,
      private patientService: PatientService,
   ) {}

   @ApiCreatedResponse({
      status: 201,
      description: 'Регистрация прошла успешно',
      type: DoctorRegisterOrLoginResponseDto,
   })
   @ApiBody({ type: createDoctorBodyDto })
   @Post('/register')
   async registerDoctor(
      @Body() body: createDoctorBodyDto,
   ): Promise<DoctorRegisterOrLoginResponseDto> {
      try {
         const { name, surname, email, password, bornDate, img, description } =
            body
         if (
            !email.includes('@') ||
            !email.includes('.') ||
            email.includes('@.')
         ) {
            return { error: ErrorsEnum.incorrectEmail }
         }
         const candidateDoctor = await this.doctorService.findDoctorByEmail(
            email,
         )
         if (candidateDoctor) {
            return { error: ErrorsEnum.exist }
         }
         const candidatePatient = await this.patientService.findPatientByEmail(
            email,
         )
         if (candidatePatient) {
            return { error: ErrorsEnum.exist }
         }
         const hashedPassword = await this.authService.passwordHash(password)

         const doctor = await this.doctorService.create({
            name,
            surname,
            email,
            password: hashedPassword,
            bornDate,
            img,
            description,
            balance: 0,
            registerDate: getRegisterDate(),
            role: RolesEnum.doctor,
         })

         return {
            token: this.authService.accessToken(
               doctor._id,
               name,
               surname,
               doctor.role,
            ),
         }
      } catch (e) {
         return { error: e.message }
      }
   }

   @ApiCreatedResponse({
      status: 201,
      description: 'Авторизация прошли успешно',
      type: DoctorRegisterOrLoginResponseDto,
   })
   @Post('/login')
   public async loginDoctor(
      @Body() body: LoginDoctorDto,
   ): Promise<DoctorRegisterOrLoginResponseDto> {
      try {
         const { email, password } = body
         const doctor = await this.doctorService.findDoctorByEmail(email)
         if (!doctor) {
            return { error: ErrorsEnum.userNotFound }
         }
         const isMatch = this.authService.bcryptPassword(
            password,
            doctor.password,
         )
         if (!isMatch) {
            return { error: ErrorsEnum.incorrectPassword }
         }
         return {
            token: this.authService.accessToken(
               doctor._id,
               doctor.name,
               doctor.surname,
               doctor.role,
            ),
         }
      } catch (e) {
         return { error: e.message }
      }
   }
}
