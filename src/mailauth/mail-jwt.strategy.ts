import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class MailJwtStrategy extends PassportStrategy(Strategy) {
    constructor()
    {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_KEY,
        })
    }
    async validate(payload) {
        const {email} = payload;
        console.log(payload);
        if(!email) {
            throw new UnauthorizedException();
        }
        return email;
    }
}