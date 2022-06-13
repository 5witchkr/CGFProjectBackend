import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class CommentDto {
    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    nickname: string;

    author: string;

    @MinLength(1)
    @IsNotEmpty()
    commentBody: string;
    
    date: Date;

}