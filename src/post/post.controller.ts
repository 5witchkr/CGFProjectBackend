import { Controller, Get } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    //todo all post get
    //todo jwt auth
    @Get('all')
    //todo promise type change
    getAllContent(): Promise<PostDto[] | null> {
        return this.postService.getAllPost();
    }
    

    //todo post post


    //todo post delete


    //todo post patch


}
