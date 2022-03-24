import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    //todo 회원가입.
    //validationPip를 만들어줄것임, type은 auth-Dto
    //로직은 authservice-join으로 할것
}
