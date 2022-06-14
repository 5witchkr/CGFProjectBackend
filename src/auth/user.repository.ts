import { ConflictException, Injectable, InternalServerErrorException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User, UserDocument } from "./user.schema";
import {Model} from 'mongoose';
import { AuthDto } from "./dto/auth.dto";
import * as bcrypt from 'bcryptjs';
import { UserProfileDto } from "./dto/auth-user.dto";

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
        } catch (error:any) {
            const errorobj = error.keyValue
            if (error.code == '11000') {
                throw new ConflictException(`Existing ${Object.keys(errorobj)[0]}`);
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async findEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({email});
    }

    //for commentdto validate
    async findNickname(nickname: string): Promise<User | null> {
        return this.userModel.findOne({nickname},{"_id": true, "nickname": true})
    }


    //get userProfilePage
    async getUserProfile(nickname: string):Promise<UserProfileDto>{
        return this.userModel.findOne({nickname},{"_id":false, "email": true, "nickname": true, "company":true, "profileImage":true})
    }


    async updateUserProfile(nickname: string, userProfileDto: UserProfileDto): Promise<void> {
        const {company, profileImage } = userProfileDto;
        const id = (await this.userModel.findOne({nickname}))._id;
        await this.userModel.findByIdAndUpdate(id,{company, profileImage});
    }
}