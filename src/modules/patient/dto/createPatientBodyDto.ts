import { ApiProperty } from '@nestjs/swagger'

export class CreatePatientBodyDto {
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
      description: 'email',
      example: 'email@gmail.com',
   })
   email: string
   @ApiProperty({
      description: 'password',
      example: '34tge54y34ty34632Fsf34',
   })
   password: string
   @ApiProperty({
      description: 'bornDate',
      example: 2354235634734523,
   })
   bornDate: number
   @ApiProperty({
      description: 'sex',
      example: 'woman',
   })
   sex: string
   @ApiProperty({
      description: 'category',
      example: 5,
   })
   category: number
   @ApiProperty({
      description: 'drugId',
      example: '3242342323rqr3r3r43',
   })
   drugId: string
   @ApiProperty({
      description: 'dose',
      example: 15,
   })
   dose: number
}
