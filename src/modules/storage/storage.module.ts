import { Module } from '@nestjs/common';
import { AuthSharedModule } from '../auth/auth.shared-module';
import { StorageController } from './storage.controller';
import { StorageSharedModule } from './storage.shared-module';

@Module({
  controllers: [StorageController],
  imports: [StorageSharedModule, AuthSharedModule],
})
export class StorageModule {
}
