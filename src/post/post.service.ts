import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        ){}

    async getAllPostService(): Promise<PostDto[] | null> {
        return this.postRepository.findAll();
    }

    async createPostService(postDto: PostDto, authDto: AuthDto ): Promise<void> {
        //validate request & jwt information
        if (postDto.nickname == authDto.nickname) {
            return this.postRepository.createPost(postDto, authDto);
        } else {
            throw new UnauthorizedException('Fail user information validate');
        }
    }

    async findOnePostService(id: string): Promise<PostDto | null> {
        return this.postRepository.findPost(id);
    }

    async deletePostService(id: string, authDto: AuthDto): Promise<void> {
        //validate post-user & jwt information
        if ((await this.postRepository.findPost(id)).nickname == authDto.nickname) {
            return this.postRepository.deletePost(id);
        } else {
            throw new UnauthorizedException('Fail user information validate')
        }
    }

    async updatePostService(id:string, postDto: PostDto, authDto: AuthDto): Promise<void> {
        //validate post-user % jwt information
        if ((await this.postRepository.findPost(id)).nickname == authDto.nickname) {
            return await this.postRepository.updatePost(id, postDto, authDto.nickname);
        } else {
            throw new UnauthorizedException('Fail user information validate')
        }
    }
}
