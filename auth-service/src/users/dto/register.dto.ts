import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Edward Aria Tanujaya' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(55, {message : "Length of username must be less than or equal to 55"})
  username: string;

  @ApiProperty({ example: 'edwardariat123@mail.com' })
  @IsEmail({}, { message: 'please input the right email' })
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Indonesia' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MaxLength(55, {message : "Length of password must be less than or equal to 55"})
  password: string;
}