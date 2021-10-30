import { ApiProperty } from '@nestjs/swagger';

export class DoctorRegisterOrLoginResponseDto {
  @ApiProperty({
    description: 'Токен',
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNzQzNmE2MGQ5MmJmN2I1Yjc2YzY5MCIsIm5hbWUiOiJNaWNoYWlsIiwic3VybmFtZSI6Ik1pY2hhaWxvdiIsInJvbGUiOiJkb2N0b3IiLCJpYXQiOjE2MzUwMDYxMTl9.oUiMrmBUZ0OmWisGyVXGH-JvyZ9KPkojbStkuH57C10',
  })
  token?: string;
  @ApiProperty({
    description: 'Ошибка',
    example: 'Такой пользователь уже существует',
  })
  error?: string;
}