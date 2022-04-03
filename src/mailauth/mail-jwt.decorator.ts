import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { MailEmail } from "./dto/mailemail.dto";

export const GetMailJwt = createParamDecorator((data, ctx: ExecutionContext): MailEmail => {
    const req = ctx.switchToHttp().getRequest();
    return req.email;
})