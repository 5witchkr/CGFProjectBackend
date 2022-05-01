import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { PostDto } from "./dto/post.dto";
import { Post, PostDocument } from "./post.schema";
import {Model} from 'mongoose';

@Injectable()
export class PostRepository{
    //todo repository 작성
    constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}


    //findAll
    async findAll(): Promise<Post[] | null> {
        return this.postModel.find();
    }

    //create
    async createPost(postDto: PostDto): Promise<void> {
        const { nickname, title, contents } = postDto;
        const post = new this.postModel({nickname, title, contents});
        await post.save();
    }

    async findPost(id: string): Promise<Post | null> {
        return this.postModel.findOne({id});
    }

}