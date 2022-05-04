import { Injectable } from '@nestjs/common';
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

    async createPostService(postDto: PostDto): Promise<void> {
        return this.postRepository.createPost(postDto);
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
