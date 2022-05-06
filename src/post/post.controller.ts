import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PostDto } from './dto/post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}


    //todo get simple page (no jwt)


    @Get('all')
    @UseGuards(JwtAuthGuard)
    //todo promise type change
    getAllPost(): Promise<PostDto[] | null> {
        return this.postService.getAllPostService();
    }
    
    //todo post post
    //todo jwt auth + get user param
    @Post('create')
    createPost(@Body(ValidationPipe) postDto: PostDto): Promise<void> {
        return this.postService.createPostService(postDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOnePost(@Param('id') id: string): Promise<PostDto | null> {
        return this.postService.findOnePostService(id);
    }


    //todo jwt auth + get user param
    @Delete(':id')
    deletePost(@Param('id') id: string): Promise<void> {
        return this.postService.deletePostService(id);
    }


    //todo jwt auth + get user param
    @Put(':id')
    updatePost(
        @Param('id') id: string,
        @Body(ValidationPipe)postDto: PostDto): Promise<void> {
        return this.postService.updatePostService(id,postDto);
    }


}
