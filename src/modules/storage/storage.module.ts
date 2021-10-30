import { Module } from '@nestjs/common'
import { AuthSharedModule } from '../auth/auth.shared-module'
import { StorageController } from './storage.controller'
import { StorageSharedModule } from './storage.shared-module'
import { DoctorSharedModule } from '../doctor/doctor.shared-module'

@Module({
   controllers: [StorageController],
   imports: [StorageSharedModule, AuthSharedModule, DoctorSharedModule],
})
export class StorageModule {}
