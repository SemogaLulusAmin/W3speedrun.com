import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty } from "class-validator"

export class GameInsertion{

    @ApiProperty({ example: 'Feed and Grow: Fish'})
    @IsNotEmpty()
    game_name: string

    @ApiProperty({example: 'Hunt and eat other fish - simply, grow into larger beasts!, Animal survival game based in the fish world'})
    @IsNotEmpty()
    game_description: string
}