import { Injectable } from '@nestjs/common';
import { AuthDto } from './auth.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository
    ) {}

    //join
    async join(authDto: AuthDto): Promise<void> {
        return this.userRepository.UserJoin(authDto);
    }
}
