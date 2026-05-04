import { IsNotEmpty } from "class-validator";

export class CatalogInsertion {

    @IsNotEmpty()
    game_id: string

    @IsNotEmpty()
    run_category_name: string
}