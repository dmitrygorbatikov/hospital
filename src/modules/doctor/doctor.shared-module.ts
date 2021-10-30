import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Doctor, DoctorSchema } from './doctor.schema'
import { DoctorService } from './doctor.service'
import { AuthSharedModule } from '../auth/auth.shared-module'

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Doctor.name, schema: DoctorSchema }]),
      AuthSharedModule,
   ],
   providers: [DoctorService],
   exports: [DoctorService],
})
export class DoctorSharedModule {}
