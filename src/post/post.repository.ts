import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDto } from "./dto/post.dto";
import { Post, PostDocument } from "./post.schema";
import {Model} from 'mongoose';
import { AuthDto } from "src/auth/dto/auth.dto";
import { PostTitleDto } from "./dto/postTitle.dto";



@Injectable()
export class PostRepository{
    //todo repository 작성
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}


    //findTitle
    async findTitle(): Promise<PostTitleDto[] | null> {
        return this.postModel.find({},{"_id": false, "nickname": true, "title":true});
    }

    //findAll
    async findAll(): Promise<Post[] | null> {
        return await this.postModel.find();
    }

    //create
    async createPost(postDto: PostDto, authDto: AuthDto): Promise<void> {
        const { title, contents } = postDto;
        const { nickname } = authDto;
        const date = Date();
        const post = new this.postModel({nickname, title, contents, date});
        await post.save();
    }

    //findOne
    async findPost(id: string): Promise<Post | null> {
        try {
            return await this.postModel.findById(id);
        } catch(e) {
            console.log(e);
            throw new UnprocessableEntityException('Nonexistent PostId');
        }
    }

    //delete
    async deletePost(id: string): Promise<void> {
        await this.postModel.findByIdAndRemove(id);
    }

    //put
    async updatePost(id: string, postDto: PostDto, nickname: String): Promise<void> {
        const { title, contents } = postDto;
        await this.postModel.findByIdAndUpdate(id,{nickname, title, contents});
    }
    
}