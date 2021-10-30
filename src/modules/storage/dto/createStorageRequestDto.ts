import { ApiProperty } from '@nestjs/swagger'

export class CreateStorageRequestDto {
   @ApiProperty({
      description: 'Title',
      example: 'title',
   })
   title: string
   @ApiProperty({
      description: 'Capacity',
      example: 10000,
   })
   capacity: number
}
