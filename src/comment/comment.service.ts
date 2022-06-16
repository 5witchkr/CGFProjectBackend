import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PostRepository } from 'src/post/post.repository';
import { Model } from 'mongoose';
import { CommentDto } from './dto/comment.dto';
import { Comments } from './comment.schema';
import { AuthDto } from 'src/auth/dto/auth.dto';

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

    async createComment(id: string, commentDto: CommentDto, authDto: AuthDto) {
        try {
            if (commentDto.nickname == authDto.nickname) {
                const targetPost = await this.postRepository.findPost(id)
                const { nickname, commentBody } = commentDto;
                const newComments = new this.commentsModel({
                nickname : nickname,
                commentBody,
                info: targetPost._id,
                });
                return await newComments.save();
            } else {
                throw new UnauthorizedException('Fail user information validate')
            }
        } catch (error) {
            throw new BadRequestException(error);
        }
    }

}
