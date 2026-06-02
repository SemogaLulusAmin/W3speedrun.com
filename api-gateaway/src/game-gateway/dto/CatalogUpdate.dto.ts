import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsOptional, IsString } from "class-validator"

export class CatalogUpdate {

    @ApiProperty({example: ""})
    @IsString()
    @IsOptional()
    game_id?: string
    @ApiProperty({example: "Idle"})
    @IsString()
    @IsOptional()
    run_category_name?: string 
}