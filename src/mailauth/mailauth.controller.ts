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


    // todo 캐시설정
    @Post('testcache')
    testcache(@Body(ValidationPipe) mailMatch: MailMatch): Promise<void>{
        return this.mailAuthService.mailcode(mailMatch);
    }
}
