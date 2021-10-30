import { ApiProperty } from '@nestjs/swagger'

export class LoginDoctorDto {
   @ApiProperty({
      description: 'Email',
      example: 'michail.228@gmail.com',
   })
   email: string
   @ApiProperty({
      description: 'Пароль',
      example: 'qwerty123',
   })
   password: string
}
