import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { AuthDto } from "./dto/auth.dto";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): AuthDto => {
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})