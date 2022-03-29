import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { MailAuthService } from './mailauth.service';

@Controller('mailauth')
export class MailAuthController {
    constructor(private mailAuthService: MailAuthService) {}


    //mailer Test // todo 입력메일 유효성검사 추가
    @Post('testmailer')
    testmailer(@Body(ValidationPipe) email: string): Promise<string>{
        return this.mailAuthService.sendMail(email);
    }


    //todo mail인증 체크 // todo 토큰보내기
    @Post('testcache')
    testcache(@Body(ValidationPipe) email: string): Promise<string>{
        return this.mailAuthService.findcache(email);
    }
}
