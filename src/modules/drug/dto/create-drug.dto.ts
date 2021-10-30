import { ApiProperty } from '@nestjs/swagger'

export class CreateDrugDto {
   @ApiProperty({
      description: 'Название',
      example: 'Анальгин',
   })
   title: string
   @ApiProperty({
      description: 'Описание',
      example: 'Обезболивающее',
   })
   description: string
   @ApiProperty({
      description: 'Дата выпуска',
      example: 126413435656,
   })
   dateFrom: number
   @ApiProperty({
      description: 'Срок годности до',
      example: 126457435656,
   })
   dateTo: number
   @ApiProperty({
      description: 'count of drugs',
      example: 30,
   })
   count: number
   @ApiProperty({
      description: 'weight of 1 drugs',
      example: 2,
   })
   weight: number
   @ApiProperty({
      description: 'Минимальная температура хранения',
      example: -50,
   })
   minTemperature: number
   @ApiProperty({
      description: 'Price',
      example: 50,
   })
   price: number
   @ApiProperty({
      description: 'Максимальная температура хранения',
      example: 50,
   })
   maxTemperature: number
   @ApiProperty({
      description: 'Id хранилища',
      example: 'ff3eh369-f4h438edf',
   })
   storageId: string
   @ApiProperty({
      description: 'Дата добавления',
      example: 12345689675856,
   })
   registerDate: number
}
