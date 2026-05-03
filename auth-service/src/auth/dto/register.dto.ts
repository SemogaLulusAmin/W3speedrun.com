import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength, IsStrongPassword } from 'class-validator';

export class RegisterDto {
  @ApiProperty({ example: 'Edward Aria Tanujaya' })
  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(40)
  username: string;

  @ApiProperty({ example: 'edwardariat123@mail.com' })
  @IsEmail({})
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: 'Indonesia' })
  @IsString()
  @IsNotEmpty()
  country: string;

  @ApiProperty({ example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(40)
  @IsStrongPassword(
    {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  password: string;
}