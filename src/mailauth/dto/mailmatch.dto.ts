import { IsEmail, IsString, Length, MaxLength, MinLength } from "class-validator";

export class MailMatch {
    @IsString()
    @IsEmail()
    @MaxLength(40)
    @MinLength(4)
    email: string;

    @Length(6)
    @IsString()
    mailcode: number;
}