import { Module } from '@nestjs/common'
import { AuthSharedModule } from '../auth/auth.shared-module'
import { HistorySharedModule } from './history.shared-module'
import { HistoryController } from './history.controller'
import { DoctorSharedModule } from '../doctor/doctor.shared-module'

@Module({
   controllers: [HistoryController],
   imports: [AuthSharedModule, HistorySharedModule, DoctorSharedModule],
})
export class HistoryModule {}
