import { ApiProperty } from '@nestjs/swagger'

export class AddDrugDto {
   @ApiProperty({
      description: 'count',
      example: 34,
   })
   count: number
   @ApiProperty({
      description: 'Дата выпуска',
      example: 126413435656,
   })
   dateFrom?: number
   @ApiProperty({
      description: 'Срок годности до',
      example: 126457435656,
   })
   dateTo?: number
}
