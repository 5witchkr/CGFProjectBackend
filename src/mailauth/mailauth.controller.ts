import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MailAuthService } from './mailauth.service';
import { MailEmail } from './dto/mailemail.dto';
import { MailMatch } from './dto/mailmatch.dto';
import { MailJwtGuard } from './mail-jwt.guard';
import { GetMailJwt } from './mail-jwt.decorator';

@Controller('mailauth')
export class MailAuthController {
    constructor(private mailAuthService: MailAuthService) {}


    //mailer Test
    @Post('testmailer')
    testmailer(@Body(ValidationPipe) mailEmail: MailEmail): Promise<void>{
        return this.mailAuthService.sendMail(mailEmail);
    }


    // todo 토큰보내기 //todo 토큰 인증문제있음
    @Post('testcache')
    testcache(@Body(ValidationPipe) mailMatch: MailMatch): Promise<{accessToken}>{
        return this.mailAuthService.mailcode(mailMatch);
    }

    //jwt token strategy test //todo 다시만들기
    @Post('testjwt')
    @UseGuards(MailJwtGuard)
    testjwt(@GetMailJwt() mailEmail: MailEmail) {
        console.log('email:',mailEmail)
    }
}
