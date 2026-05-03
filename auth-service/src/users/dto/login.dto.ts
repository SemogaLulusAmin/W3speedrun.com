import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'edwardariat123@mail.com' })
  @IsEmail({}, { message: 'please input the right email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(55, {message : "Length of password must be less than or equal to 55"})
  password: string;
}