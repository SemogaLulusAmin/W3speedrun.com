import { IsNotEmpty, IsNumber } from "class-validator";

export class SubmitRun {

    @IsNotEmpty()
    run_category_id : number

    @IsNotEmpty()
    vod_url: string

    @IsNumber()
    @IsNotEmpty()
    run_duration: number

}