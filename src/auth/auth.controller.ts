import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt.guard';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //join(todo 메일인증 토큰 검증 추가하기)
    @Post('join')
    // @UseGuards(MailJwtGuard)
    join(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
        return this.authService.join(authDto);
    }

    //login
    @Post('login')
    login(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{accessToken}> {
        return this.authService.login(authLoginDto);
    }

    //jwt token strategy test
    @Post('testjwt')
    @UseGuards(JwtAuthGuard)
    testjwt(@GetUser() authDto: AuthDto) {
        console.log('user:',authDto)
    }
}
