import { Controller, Get, Headers } from '@nestjs/common'
import { HistoryService } from './history.service'
import { ErrorsEnum } from '../../enums/enums'
import { AuthService } from '../auth/auth.service'
import { DoctorService } from '../doctor/doctor.service'
import { ApiHeader, ApiParam, ApiTags } from '@nestjs/swagger'

@ApiTags('history')
@Controller('history')
export class HistoryController {
   constructor(
      private historyService: HistoryService,
      private authService: AuthService,
      private doctorService: DoctorService,
   ) {}

   @ApiHeader({
      name: 'token',
   })
   @Get('/doctor')
   public async getDoctorHistory(@Headers() headers) {
      try {
         const doctor = await this.doctorService.checkDoctorRole(headers.token)
         if (!doctor) {
            return { error: ErrorsEnum.notEnoughRights }
         }
         const history = await this.historyService.getDoctorHistory(doctor._id)
         return { history }
      } catch (e) {
         return { error: e }
      }
   }

   @ApiHeader({
      name: 'token',
   })
   @Get('/patient')
   public async getPatientHistory(@Headers() headers) {
      try {
         const decodeToken = this.authService.decodeToken(headers.token)
         if (!decodeToken) {
            return { error: ErrorsEnum.userNotFound }
         }
         const history = await this.historyService.getPatientHistory(
            decodeToken.id,
         )
         return { history }
      } catch (e) {
         return { error: e }
      }
   }
}
