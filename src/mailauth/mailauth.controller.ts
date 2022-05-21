import { Body, Controller, Post, UseGuards, ValidationPipe } from '@nestjs/common';
import { MailAuthService } from './mailauth.service';
import { MailEmail } from './dto/mailemail.dto';
import { MailMatch } from './dto/mailmatch.dto';

@Controller('mailauth')
export class MailAuthController {
    constructor(private mailAuthService: MailAuthService) {}


    //send mailer
    @Post('sendmailer')
    testmailer(@Body(ValidationPipe) mailEmail: MailEmail): Promise<void>{
        return this.mailAuthService.sendMail(mailEmail);
    }


    //mailcode-cachecode validtation logic
    @Post('mailcode')
    testcache(@Body(ValidationPipe) mailMatch: MailMatch): Promise<void>{
        return this.mailAuthService.mailcode(mailMatch);
    }
}
