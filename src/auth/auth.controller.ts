import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { AuthLoginDto } from './auth-login.dto';
import { AuthDto } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //validationPip를 만들어줄것임, type은 auth-Dto
    //로직은 authservice-join으로 할것

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
}
