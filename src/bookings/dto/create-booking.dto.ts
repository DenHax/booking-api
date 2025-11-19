import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsString, Min } from 'class-validator';

export class CreateBookingDto {
  @IsInt()
  @Min(1)
  @ApiProperty()
  event_id: number;

  @IsString()
  @ApiProperty()
  user_id: string;
}
