import { ApiProperty } from '@nestjs/swagger';

export class CreateDrugDto {
  @ApiProperty({
    description: 'Название',
    example: 'Анальгин',
  })
  title: string;
  @ApiProperty({
    description: 'Описание',
    example: 'Обезболивающее',
  })
  description: string;
  @ApiProperty({
    description: 'Дата выпуска',
    example: 126413435656,
  })
  dateFrom: number;
  @ApiProperty({
    description: 'Срок годности до',
    example: 126457435656,
  })
  dateTo: number;
  @ApiProperty({
    description: 'Дозирование',
    example: 30.5,
  })
  doses: number;
  @ApiProperty({
    description: 'Минимальная температура хранения',
    example: -50,
  })
  minTemperature: number;
  @ApiProperty({
    description: 'Максимальная температура хранения',
    example: 50,
  })
  maxTemperature: number;
  @ApiProperty({
    description: 'Id хранилища',
    example: 'ff3eh369-f4h438edf',
  })
  storageId: string;
  @ApiProperty({
    description: 'Дата добавления',
    example: 12345689675856,
  })
  registerDate: number;
}