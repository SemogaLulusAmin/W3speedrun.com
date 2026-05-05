import { IsNotEmpty} from "class-validator";

export class PostComment {
    
    @IsNotEmpty()
    run_id: string

    @IsNotEmpty()
    user_id: string

    @IsNotEmpty()
    comment: string
}