import { ApiProperty } from '@nestjs/swagger'

export class StorageIndicatorsDto {
   @ApiProperty({
      description: 'temperature',
      example: 18,
   })
   temperature: number
   @ApiProperty({
      description: 'humidity',
      example: 45,
   })
   humidity: number
   @ApiProperty({
      description: 'measurementDate',
      example: 1290458256234,
   })
   measurementDate: number
}
