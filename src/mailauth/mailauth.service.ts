import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';


@Injectable()
export class MailAuthService {
    constructor(
        private readonly mailerService: MailerService,
    ) {}

    //emailsend Test //todo email유효성검사 //todo 인증번호 캐싱하기
    async sendMail(email: string) {
        const userEmail = Object.values(email)[0]
        try {
            const number: number = randomInt(111111,999999);
            await this.mailerService.sendMail({
                to: userEmail,
                subject: '인증메일 요청입니다.',
                html: '6자리 인증코드 :' + `<b>${number}</b>`,
            });
            return number;
        } catch (err) {
            console.log(err);
        }
    }
}
