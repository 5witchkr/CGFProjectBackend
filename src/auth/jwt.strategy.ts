import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthDto } from "./dto/auth.dto";
import { Payload } from "./payload.interface";
import { UserRepository } from "./user.repository";
import { Request } from 'express';

//jwt strategy jwt토큰 인증처리
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private readonly userRepository: UserRepository
    ) {
        super({
            //BearerToken logic
            // jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),

            //cookieToken logic
            jwtFromRequest: ExtractJwt.fromExtractors([
                (request: Request) => {
                  return request?.cookies?.jwt;
                },
              ]),
            secretOrKey: process.env.JWT_KEY,
        })
    }
    async validate(payload: Payload) {
        const {email} = payload;
        const user: AuthDto = await this.userRepository.findEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}