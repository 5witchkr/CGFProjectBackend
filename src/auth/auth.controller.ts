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
    join(@Body(ValidationPipe) authDto: AuthDto): Promise<void> {
        return this.authService.join(authDto);
    }

    //login
    @Post('login')
    login(@Body(ValidationPipe) authLoginDto: AuthLoginDto): Promise<{accessToken}> {
        return this.authService.login(authLoginDto);
    }

    //todo mail인증 보내기

    //todo mail인증 체크 (토큰보내기)


    //jwt token strategy test
    @Post('testjwt')
    @UseGuards(JwtAuthGuard)
    testjwt(@GetUser() authDto: AuthDto) {
        console.log('user:',authDto)
    }

    //mailer Test todo 입력메일 유효성검사 추가
    @Post('testmailer')
    testmailer(@Body(ValidationPipe) email:string): Promise<any>{
        return this.authService.sendMail(email);
    }
}
