import { Module } from '@nestjs/common';
import { AuthSharedModule } from '../auth/auth.shared-module';
import { DoctorController } from './doctor.controller';
import { DoctorSharedModule } from './doctor.shared-module';

@Module({
  controllers: [DoctorController],
  imports: [DoctorSharedModule, AuthSharedModule],
})
export class DoctorModule {
}
