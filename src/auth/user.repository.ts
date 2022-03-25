import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import {Model} from 'mongoose';
import { AuthDto } from "./auth.dto";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserRepository{
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

    async UserJoin(authDto: AuthDto): Promise<void> {
        const { email, password, nickname, company } = authDto;

        //암호화
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = new this.userModel({email, password: hashedPassword, nickname, company})

        try {
            await user.save();
        } catch (error) {
            if (error.code == '23505') {
                throw new ConflictException('Existing email');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}