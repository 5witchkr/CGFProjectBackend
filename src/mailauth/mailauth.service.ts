import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';
import { Cache } from 'cache-manager';


@Injectable()
export class MailAuthService {
    constructor(
        private readonly mailerService: MailerService,
        @Inject(CACHE_MANAGER) private cacheManager: Cache
    ) {}

    //emailsend Test //todo email유효성검사
    async sendMail(email: string): Promise<string>{
        const userEmail = Object.values(email)[0]
        const number: number = randomInt(111111,999999);
        try {
            await this.mailerService.sendMail({
                to: userEmail,
                subject: '인증메일 요청입니다.',
                html: '6자리 인증코드 :' + `<b>${number}</b>`,
            });
            //caching
            await this.cacheManager.set(userEmail,number);
            return "success"

        } catch (err) {
            console.log(err);
        }
    }

    //todo validate cache-code
    async findcache(email: string): Promise<string> {
        const userEmail = Object.values(email)[0]
        const value: number = await this.cacheManager.get(userEmail);
        console.log(value);
        return "success"
    }
}
