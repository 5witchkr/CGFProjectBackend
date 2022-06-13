import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostRepository } from 'src/post/post.repository';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { UserRepository } from 'src/auth/user.repository';
import { Comment } from './comment.schema';

@Injectable()
export class CommentService {
    constructor(
        @InjectModel(Comment.name) private readonly commentModel: Model<Comment>,
        private readonly postRepository: PostRepository,
        private readonly userRepository: UserRepository,
    ) {}

    async getComment() {
        try {
            const comments = await this.commentModel.find();
            return comments;
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

    async createComment(id: string, commentDto: CommentDto) {
        try {
            const targetPost = await this.postRepository.findPost(id)
            const { nickname, commentBody } = commentDto;

            const validateAuth = await this.userRepository.findNickname(nickname);

            const newComment = new this.commentModel({
                author : validateAuth._id,
                commentBody,
                info: targetPost._id,
            });
            return await newComment.save();
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}
