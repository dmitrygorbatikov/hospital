import { Module } from '@nestjs/common'
import { AuthModule } from './modules/auth/auth.module'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { PatientModule } from './modules/patient/patient.module'
import { DoctorModule } from './modules/doctor/doctor.module'
import { DrugModule } from './modules/drug/drug.module'
import { StorageModule } from './modules/storage/storage.module'
import { HistoryController } from './modules/history/history.controller';
import { HistoryService } from './modules/history/history.service';
import { HistoryModule } from './modules/history/history.module';

@Module({
   imports: [
      ConfigModule.forRoot({
         envFilePath: '.env',
      }),
      MongooseModule.forRoot(process.env.MONGO_URI),
      AuthModule,
      PatientModule,
      DoctorModule,
      DrugModule,
      StorageModule,
      HistoryModule,
   ],
   providers: [AppModule, HistoryService],
   controllers: [HistoryController],
})
export class AppModule {}
