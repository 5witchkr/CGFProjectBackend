import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Payload } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService
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
}
