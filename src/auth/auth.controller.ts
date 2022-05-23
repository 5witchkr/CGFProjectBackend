import { Body, Controller, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { GetUser } from './get-user.decorator';
import { UserProfileDto } from './dto/auth-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //join
    @Post('join')
    join(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
        return this.authService.join(authDto);
    }

    //login
    @Post('login')
    login(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{accessToken}> {
        return this.authService.login(authLoginDto);
    }

    //updateUserProfile
    @Put(':email')
    @UseGuards(JwtAuthGuard)
    updateProfile(
        @Param('email') email: string,
        @Body(ValidationPipe) userProfileDto: UserProfileDto,
        @GetUser() authDto: AuthDto): Promise<void> {
            console.log('user:',authDto)
            return this.authService.updateUserProfile(email, userProfileDto, authDto);
        }


    //jwt token strategy test
    @Post('testjwt')
    @UseGuards(JwtAuthGuard)
    testjwt(@GetUser() authDto: AuthDto) {
        console.log('user:',authDto)
    }
}
