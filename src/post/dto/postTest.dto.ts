import { IsNotEmpty, MinLength } from "class-validator";


export class PostTestDto {
    @MinLength(1)
    @IsNotEmpty()
    title: string;

    @MinLength(1)
    @IsNotEmpty()
    contents: string;
}