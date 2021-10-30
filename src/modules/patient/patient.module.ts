import { Module } from '@nestjs/common';
import { PatientController } from './patient.controller';
import { PatientSharedModule } from './patient.shared-module';
import { AuthSharedModule } from '../auth/auth.shared-module';

@Module({
  controllers: [PatientController],
  imports: [PatientSharedModule, AuthSharedModule],
})
export class PatientModule {
}
