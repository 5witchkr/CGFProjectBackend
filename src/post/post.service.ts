import { Injectable } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
    constructor(
        private postRepository: PostRepository,
        ){}

    async getAllPost(): Promise<PostDto[] | null> {
        return this.postRepository.findAll();
    }

}
