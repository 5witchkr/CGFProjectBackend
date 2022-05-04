import { Body, Controller, Delete, Get, Param, Post, Put, ValidationPipe } from '@nestjs/common';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}

    //todo all post get
    //todo jwt auth
    @Get('all')
    //todo promise type change
    getAllPost(): Promise<PostDto[] | null> {
        return this.postService.getAllPostService();
    }
    
    //todo post post
    //todo jwt auth
    @Post('create')
    createPost(@Body(ValidationPipe) postDto: PostDto): Promise<void> {
        return this.postService.createPostService(postDto);
    }

    //todo jwt auth
    @Get(':id')
    getOnePost(@Param('id') id: string): Promise<PostDto | null> {
        return this.postService.findOnePostService(id);
    }


    //todo post delete
    @Delete(':id')
    deletePost(@Param('id') id: string): Promise<void> {
        return this.postService.deletePostService(id);
    }


    //todo post Put
    @Put(':id')
    updatePost(
        @Param('id') id: string,
        @Body(ValidationPipe)postDto: PostDto): Promise<void> {
        return this.postService.updatePostService(id,postDto);
    }


}
