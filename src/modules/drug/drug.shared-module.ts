import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Drug, DrugSchema } from './drug.schema'
import { DrugService } from './drug.service'
import { AuthSharedModule } from '../auth/auth.shared-module'

@Module({
   imports: [
      MongooseModule.forFeature([{ name: Drug.name, schema: DrugSchema }]),
      AuthSharedModule,
   ],
   providers: [DrugService],
   exports: [DrugService],
})
export class DrugSharedModule {}
