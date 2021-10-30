import { ApiProperty } from '@nestjs/swagger'

export class HistoryDrugDto {
   @ApiProperty({
      description: 'money',
      example: 1234,
   })
   money: number
   @ApiProperty({
      description: 'type',
      example: 'add',
   })
   type: string
   @ApiProperty({
      description: 'drugTitle',
      example: 'drugTitle',
   })
   drugTitle: string
   @ApiProperty({
      description: 'drugId',
      example: '235gt4w35gw34g43w',
   })
   drugId: string
   @ApiProperty({
      description: 'countDrugs',
      example: 423,
   })
   countDrugs: number
   @ApiProperty({
      description: 'doctorId',
      example: '235gt4w35gw34g43w',
   })
   doctorId: string
   @ApiProperty({
      description: 'doctorName',
      example: 'doctorName',
   })
   doctorName: string
   @ApiProperty({
      description: 'doctorSurName',
      example: 'doctorSurName',
   })
   doctorSurName: string
   @ApiProperty({
      required: false,
      description: 'patientName',
      example: 'patientName',
   })
   patientName?: string
   @ApiProperty({
      required: false,
      description: 'patientSurName',
      example: 'patientSurName',
   })
   patientSurName?: string
   @ApiProperty({
      required: false,
      description: 'patientId',
      example: '235gt4w35gw34g43w',
   })
   patientId?: string
   @ApiProperty({
      description: 'registerDate',
      example: 42352356234256,
   })
   registerDate: number
}
