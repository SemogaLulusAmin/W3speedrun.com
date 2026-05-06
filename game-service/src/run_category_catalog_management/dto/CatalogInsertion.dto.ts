import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CatalogInsertion {
    @ApiProperty({ example: ""})
    @IsNotEmpty()
    game_id: string

    @ApiProperty({ example: "Survival"})
    @IsNotEmpty()
    run_category_name: string
}