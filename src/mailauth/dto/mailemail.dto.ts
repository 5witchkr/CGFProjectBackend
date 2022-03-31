import { IsEmail, IsString, MaxLength, MinLength } from "class-validator";

export class MailEmail {
    @IsString()
    @IsEmail()
    @MaxLength(40)
    @MinLength(4)
    email: string;
}