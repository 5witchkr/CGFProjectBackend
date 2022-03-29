import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Payload } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { MailerService } from '@nestjs-modules/mailer';
import { randomInt } from 'crypto';


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
        private readonly mailerService: MailerService,
    ) {}

    //join
    async join(authDto: AuthDto): Promise<void> {
        return this.userRepository.UserJoin(authDto);
    }

    //login
    async login(authLoginDto: AuthLoginDto): Promise<{accessToken: string}>{
        const { email, password } = authLoginDto;

        //email check
        const user = await this.userRepository.findEmail(email);

        if (!user) {
            throw new UnauthorizedException('Check your email or password !');
        }

        //bcrypt compare
        if (user && (await bcrypt.compare(password, user.password))) {
            //token
            const payload: Payload = { email };
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException('Check your email or password !');
        }
    }

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
