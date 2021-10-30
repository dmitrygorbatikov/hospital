import { ApiProperty } from '@nestjs/swagger';

export class UpdateDoctorDto {
  @ApiProperty({
    example: 'Dimas',
  })
  name: string;
  @ApiProperty({
    example: 'Gorbatikov',
  })
  surname: string;
  @ApiProperty({
    example: 'date:/image.jpeg',
  })
  img: string;
  @ApiProperty({
    example: 'Description',
  })
  description: string;
}