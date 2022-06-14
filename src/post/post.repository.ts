import { Injectable, UnprocessableEntityException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDto } from "./dto/post.dto";
import { Post } from "./post.schema";
import {Model} from 'mongoose';
import { AuthDto } from "src/auth/dto/auth.dto";
import { PostTitleDto } from "./dto/postTitle.dto";
import * as mongoose from "mongoose";
import { CommentsSchema } from "src/comment/comment.schema";



@Injectable()
export class PostRepository{
    //todo repository 작성
    constructor(@InjectModel(Post.name) private postModel: Model<Post>) {}


    //findTitle
    async findTitle(page: number): Promise<Post[] | null> {
        return this.postModel.find({},{"_id": true, "nickname": true, "title":true, "date":true})
        .sort({"date":-1})
        .skip(page*10)
        .limit(10);
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

    //findOne and comment
    async findPostAndComment(id: string): Promise<Post | null> {
        const CommentsModel = mongoose.model('comments', CommentsSchema);
        const result = await this.postModel.findById(id).populate('comments', CommentsModel);
        return result;
    }

    //delete
    async deletePost(id: string): Promise<void> {
        await this.postModel.findByIdAndRemove(id);
    }

    //put
    async updatePost(id: string, postDto: PostDto, nickname: string): Promise<void> {
        const { title, contents } = postDto;
        await this.postModel.findByIdAndUpdate(id,{nickname, title, contents});
    }
    
}