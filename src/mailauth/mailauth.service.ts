import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';
import { Cache } from 'cache-manager';
import { MailMatch } from './dto/mailmatch.dto';
import { MailEmail } from './dto/mailemail.dto';


@Injectable()
export class MailAuthService {
    constructor(
        private readonly mailerService: MailerService,
        //use cache
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}

    //emailsend Test
    async sendMail(mailEmail: MailEmail): Promise<void>{
        // const userEmail = Object.values(email)[0]
        const { email } = mailEmail;
        const number: number = randomInt(111111,999999);
        try {
            await this.mailerService.sendMail({
                to: email,
                subject: '인증메일 요청입니다.',
                html: '6자리 인증코드 :' + `<b>${number}</b>`,
            });
            //caching
            await this.cacheManager.set(email,number);

        } catch (err) {
            console.log(err);
        }
    }

    //todo return token
    async mailcode(mailMatch: MailMatch): Promise<void> {
        const { email, mailcode } = mailMatch;
        const value: number = await this.cacheManager.get(email);
        if (mailcode == value) {
            console.log("true");
            await this.cacheManager.set(email,email);
            console.log(this.cacheManager.get(email));
        } else {
            throw new UnauthorizedException('access failed');
        }
    }
}
