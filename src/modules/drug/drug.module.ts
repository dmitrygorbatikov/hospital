import { Module } from '@nestjs/common'
import { AuthSharedModule } from '../auth/auth.shared-module'
import { DrugController } from './drug.controller'
import { DrugSharedModule } from './drug.shared-module'
import { StorageSharedModule } from '../storage/storage.shared-module'
import { DoctorSharedModule } from '../doctor/doctor.shared-module'
import { HistorySharedModule } from '../history/history.shared-module'
import { PatientSharedModule } from '../patient/patient.shared-module'

@Module({
   controllers: [DrugController],
   imports: [
      DrugSharedModule,
      AuthSharedModule,
      StorageSharedModule,
      DoctorSharedModule,
      HistorySharedModule,
      PatientSharedModule,
   ],
})
export class DrugModule {}
