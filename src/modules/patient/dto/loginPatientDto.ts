import { ApiProperty } from '@nestjs/swagger'

export class LoginPatientDto {
   @ApiProperty({
      description: 'email',
      example: 'email@gmail.com',
   })
   email: string
   @ApiProperty({
      description: 'password',
      example: 'qweqweasdasd',
   })
   password: string
}
