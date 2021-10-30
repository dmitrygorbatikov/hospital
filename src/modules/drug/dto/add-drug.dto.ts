import { ApiProperty } from '@nestjs/swagger'

export class AddDrugDto {
   @ApiProperty({
      description: 'count',
      example: 34,
   })
   count: number
}
