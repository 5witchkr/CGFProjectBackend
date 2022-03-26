import { IsBoolean, IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";


export class AuthDto {
    @IsString()
    @MinLength(4)
    @IsEmail()
    @MaxLength(40)
    email: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/^[a-zA-Z0-9]*$/, {
        message: 'password only accepts english and number'
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    nickname: string;

    @IsBoolean()
    @IsNotEmpty()
    company: boolean;
}