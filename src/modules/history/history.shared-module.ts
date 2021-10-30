import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { AuthSharedModule } from '../auth/auth.shared-module'
import { History, HistorySchema } from './history.schema'
import { HistoryService } from './history.service'

@Module({
   imports: [
      MongooseModule.forFeature([
         { name: History.name, schema: HistorySchema },
      ]),
      AuthSharedModule,
   ],
   providers: [HistoryService],
   exports: [HistoryService],
})
export class DrugSharedModule {}
