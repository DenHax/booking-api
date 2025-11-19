import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsInt, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @MaxLength(255)
  @ApiProperty()
  name: string;

  @IsInt()
  @Min(1)
  @ApiProperty()
  total_seats: number;
}
