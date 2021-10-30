import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { StorageService } from './storage.service'
import { Storage, StorageSchema } from './storage.schema'
import { AuthSharedModule } from '../auth/auth.shared-module'
import { DoctorSharedModule } from '../doctor/doctor.shared-module'

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: Storage.name, schema: StorageSchema },
      ]),
      AuthSharedModule,
      DoctorSharedModule,
   ],
   providers: [StorageService],
   exports: [StorageService],
})
export class StorageSharedModule {}
