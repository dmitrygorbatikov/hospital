import { ApiProperty } from '@nestjs/swagger'
import { PatientDosesDto } from './patientDosesDto'

export class UpdateUserProfileDto {
   @ApiProperty({
      description: 'name',
      example: 'Dimas',
   })
   name: string
   @ApiProperty({
      description: 'surname',
      example: 'Gorbatikov',
   })
   surname: string
   @ApiProperty({
      description: 'category',
      example: 5,
   })
   category: number
   @ApiProperty({
      description: 'sex',
      example: 'woman',
   })
   doses: PatientDosesDto
}
