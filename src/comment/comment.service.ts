import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostRepository } from 'src/post/post.repository';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { Comments } from './comment.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comments.name) private readonly commentsModel: Model<Comments>,
        private readonly postRepository: PostRepository,
    ) {}

    async getComment() {
        try {
            const comments = await this.commentsModel.find();
            return comments;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async createComment(id: string, commentDto: CommentDto) {
        try {
            const targetPost = await this.postRepository.findPost(id)
            const { nickname, commentBody } = commentDto;

            const newComments = new this.commentsModel({
                nickname : nickname,
                commentBody,
                info: targetPost._id,
            });
            return await newComments.save();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}
