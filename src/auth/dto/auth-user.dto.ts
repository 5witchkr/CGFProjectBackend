import { IsBoolean, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";


export class UserProfileDto {
    
    @IsBoolean()
    @IsNotEmpty()
    company: boolean;

    @IsString()
    profileImage: string;
}