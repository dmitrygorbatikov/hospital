import { Module } from '@nestjs/common'
import { PatientSharedModule } from '../patient/patient.shared-module'
import { AuthController } from './auth.controller'
import { AuthSharedModule } from './auth.shared-module'
import { DoctorSharedModule } from '../doctor/doctor.shared-module'

@Module({
   imports: [PatientSharedModule, AuthSharedModule, DoctorSharedModule],
   controllers: [AuthController],
})
export class AuthModule {}
