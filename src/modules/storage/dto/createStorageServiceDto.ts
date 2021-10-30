import { ApiProperty } from '@nestjs/swagger'
import { StorageIndicatorsDto } from './storageIndicatorsDto'

export class CreateStorageServiceDto {
   @ApiProperty({
      description: 'Title',
      example: 'title',
   })
   title: string
   @ApiProperty({
      description: 'Capacity',
      example: 10000,
   })
   indicators: Array<StorageIndicatorsDto>
   @ApiProperty({
      description: 'indicators',
      example: [
         { temperature: 26, humidity: 43, measurementDate: 1635596208842 },
      ],
   })
   capacity: number
   @ApiProperty({
      description: 'registerDate',
      example: 19124238595,
   })
   registerDate: number
   @ApiProperty({
      description: 'filled',
      example: 20,
   })
   filled: number
   @ApiProperty({
      description: 'doctorId',
      example: '617436a60d92bf7b5b76c690',
   })
   doctorId: string
}
