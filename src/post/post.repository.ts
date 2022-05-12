import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDto } from "./dto/post.dto";
import { Post, PostDocument } from "./post.schema";
import {Model} from 'mongoose';
import { AuthDto } from "src/auth/dto/auth.dto";



@Injectable()
export class PostRepository{
    //todo repository 작성
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}


    //findAll
    async findAll(): Promise<Post[] | null> {
        return await this.postModel.find();
    }

    //create
    async createPost(postDto: PostDto, authDto: AuthDto): Promise<void> {
        const { title, contents } = postDto;
        const { nickname } = authDto;
        const post = new this.postModel({nickname, title, contents});
        await post.save();
    }

    //findOne
    async findPost(id: string): Promise<Post | null> {
        return await this.postModel.findById(id);
    }

    //delete
    async deletePost(id: string): Promise<void> {
        await this.postModel.findByIdAndRemove(id);
    }

    //put
    async updatePost(id: string, postDto: PostDto): Promise<void> {
        const { nickname, title, contents } = postDto;
        await this.postModel.findByIdAndUpdate(id,{nickname, title, contents});
    }

}