import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class GameUpdate {

    @ApiProperty({example: ""})
    @IsString()
    @IsOptional()
    game_name?: string

    @ApiProperty({example : ""})
    @IsString()
    @IsOptional()
    description?: string
}