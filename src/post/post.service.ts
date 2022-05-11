import { Injectable } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { PostDto } from './dto/post.dto';
import { PostTestDto } from './dto/postTest.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        ){}

    async getAllPostService(): Promise<PostDto[] | null> {
        return this.postRepository.findAll();
    }

    async createPostService(postTestDto: PostTestDto, authDto:AuthDto ): Promise<void> {
        return this.postRepository.createPost(postTestDto, authDto);
    }

    async findOnePostService(id: string): Promise<PostDto | null> {
        return this.postRepository.findPost(id);
    }

    async deletePostService(id: string): Promise<void> {
        return this.postRepository.deletePost(id);
    }

    async updatePostService(id:string, postDto: PostDto): Promise<void> {
        await this.postRepository.updatePost(id, postDto);
    }
}
