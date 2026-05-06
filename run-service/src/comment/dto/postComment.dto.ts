import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty} from "class-validator";

export class PostComment {
    
    @ApiProperty({example: ""})
    @IsNotEmpty()
    run_id: string

    @ApiProperty({example: ""})
    @IsNotEmpty()
    user_id: string

    @ApiProperty({ example: "GG Bro!!!"})
    @IsNotEmpty()
    comment: string
}