import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber } from "class-validator";

export class SubmitRun {

    @ApiProperty({example : ""})
    @IsNotEmpty()
    run_category_id : number

    @ApiProperty({example: "http://wspeedrun.com/2026-04-05.mp4"})
    @IsNotEmpty()
    vod_url: string

    @ApiProperty({example : "100000"})
    @IsNumber()
    @IsNotEmpty()
    run_duration: number

}