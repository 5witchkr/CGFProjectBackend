import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class PostTitleDto {

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    nickname: string;

    @MinLength(1)
    @IsNotEmpty()
    title: string;


    date: Date;
}