import { CACHE_MANAGER, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { UserRepository } from './user.repository';
import * as bcrypt from 'bcryptjs';
import { Payload } from './payload.interface';
import { JwtService } from '@nestjs/jwt';
import { AuthLoginDto } from './dto/auth-login.dto';
import { Cache } from 'cache-manager';
import { UserProfileDto } from './dto/auth-user.dto';


@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
         //use cache
         @Inject(CACHE_MANAGER) private cacheManager: Cache,
    ) {}


    //join
    async join(authDto: AuthDto): Promise<void> {
        const { email } = authDto;
        console.log(await this.cacheManager.get(email));
        console.log(email)
        //email과 mailauth-cache일치 검증
        if (await this.cacheManager.get(email) == email) {
            return this.userRepository.UserJoin(authDto);
        } else {
            throw new UnauthorizedException('Email Verification Failed');
        }
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



    //get userProfile
    async getUserProfile(nickname: string, authDto: AuthDto):Promise<UserProfileDto> {
        try {
            if (nickname == authDto.nickname) {
                return await this.userRepository.getUserProfile(nickname);
            } else {
                throw new UnauthorizedException('Fail user information validate')
            }
        } catch(e) {
            console.log(e);
            throw new UnauthorizedException('Fail user information validate')
        }
    }




    async updateUserProfile(nickname: string, userProfileDto: UserProfileDto, authDto: AuthDto): Promise<void> {
        try {
            if (nickname == authDto.nickname) {
                return await this.userRepository.updateUserProfile(nickname, userProfileDto);
            } else {
                throw new UnauthorizedException('Fail user information validate')
            }
        } catch(e) {
            console.log(e);
            throw new UnauthorizedException('Fail user information validate')
        }
    }


}
