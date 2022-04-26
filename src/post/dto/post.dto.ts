import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class PostDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    nickname: string;

    @MinLength(1)
    @IsNotEmpty()
    title: string;

    @MinLength(1)
    @IsNotEmpty()
    contents: string;
}