import { ApiProperty } from '@nestjs/swagger'

export class saveDoctorBodyDto {
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   name: string
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   surname: string
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   email: string
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   password: string
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   bornDate: number
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   img: string
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   description: string
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   registerDate: number
   @ApiProperty({
      description: 'Имя',
      example: 'Michail',
   })
   role: string
   @ApiProperty({
      description: 'Balance',
      example: 10000,
   })
   balance: number
}
