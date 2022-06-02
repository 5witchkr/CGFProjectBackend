import { IsBoolean, IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UserProfileDto {
    @IsString()
    @MinLength(4)
    @IsEmail()
    @MaxLength(40)
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(1)
    @MaxLength(20)
    nickname: string;

    @IsBoolean()
    @IsNotEmpty()
    company: boolean;

    @IsString()
    profileImage: string;
}
