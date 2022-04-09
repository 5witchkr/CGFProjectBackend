import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MailAuthService } from './mailauth.service';
import { MailEmail } from './dto/mailemail.dto';
import { MailMatch } from './dto/mailmatch.dto';

@Controller('mailauth')
export class MailAuthController {
    constructor(private mailAuthService: MailAuthService) {}


    //mailer Test
    @Post('testmailer')
    testmailer(@Body(ValidationPipe) mailEmail: MailEmail): Promise<void>{
        return this.mailAuthService.sendMail(mailEmail);
    }


    // todo 토큰보내기 //todo 토큰 import해오기
    @Post('testcache')
    testcache(@Body(ValidationPipe) mailMatch: MailMatch): Promise<{accessToken}>{
        return this.mailAuthService.mailcode(mailMatch);
    }

    //jwt token strategy test //todo 다시만들기(언디파인뜸)
}
