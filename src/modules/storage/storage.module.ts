import { Module } from '@nestjs/common';
import { AuthSharedModule } from '../auth/auth.shared-module';
import { StorageController } from './storage.controller';
import { StorageSharedModule } from './storage.shared-module';
import { DoctorSharedModule } from '../doctor/doctor.shared-module';
import { PatientSharedModule } from '../patient/patient.shared-module';
import { DrugSharedModule } from '../drug/drug.shared-module';
import { HistorySharedModule } from '../history/history.shared-module';

@Module({
  controllers: [StorageController],
  imports: [StorageSharedModule, AuthSharedModule, DoctorSharedModule, PatientSharedModule, DrugSharedModule, HistorySharedModule],
})
export class StorageModule {
}
