import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Drug, DrugSchema } from './drug.schema';
import { DrugService } from './drug.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Drug.name, schema: DrugSchema }]),
  ],
  providers: [DrugService],
  exports: [DrugService],
})
export class DrugSharedModule {
}