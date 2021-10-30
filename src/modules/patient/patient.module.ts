import { Module } from '@nestjs/common'
import { PatientController } from './patient.controller'
import { PatientSharedModule } from './patient.shared-module'
import { AuthSharedModule } from '../auth/auth.shared-module'
import { DoctorSharedModule } from '../doctor/doctor.shared-module'

@Module({
   controllers: [PatientController],
   imports: [PatientSharedModule, AuthSharedModule, DoctorSharedModule],
})
export class PatientModule {}
