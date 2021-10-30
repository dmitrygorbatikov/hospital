import { ApiProperty } from '@nestjs/swagger'

export class PatientIndicatorsDto {
   @ApiProperty({
      description: 'temperature',
      example: 18,
   })
   temperature: number
   @ApiProperty({
      description: 'pulse',
      example: 80,
   })
   pulse: number
   @ApiProperty({
      description: 'saturation',
      example: 96,
   })
   saturation: number
   @ApiProperty({
      description: 'measurementDate',
      example: 1290458256234,
   })
   measurementDate: number
}
