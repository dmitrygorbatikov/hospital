import { Module } from '@nestjs/common';
import { AuthSharedModule } from '../auth/auth.shared-module';
import { DrugController } from './drug.controller';
import { DrugSharedModule } from './drug.shared-module';
import { StorageSharedModule } from '../storage/storage.shared-module';

@Module({
  controllers: [DrugController],
  imports: [DrugSharedModule, AuthSharedModule, StorageSharedModule],
})
export class DrugModule {
}
