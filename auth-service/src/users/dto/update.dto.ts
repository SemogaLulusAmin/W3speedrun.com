import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateDto {
  @ApiProperty({ example: 'Edward Aria Tanujaya' })
  @IsString()
  @IsNotEmpty()
  username: string;
}