import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PostDto } from './dto/post.dto';
import { PostTitleDto } from './dto/postTitle.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
    constructor(private postService: PostService){}


    //get simple page (no jwt)
    //pagination & sort
    @Get('/page/:page')
    getPostTitle(@Param('page') page: number): Promise<PostTitleDto[] | null> {
        return this.postService.getPostTitleService(page);
    }


    @Get('all')
    @UseGuards(JwtAuthGuard)
    //todo promise type change
    getAllPost(): Promise<PostDto[] | null> {
        return this.postService.getAllPostService();
    }
    
    //post post
    //jwt auth + get user jwt
    @Post('')
    @UseGuards(JwtAuthGuard)
    createPost(
        @Body(ValidationPipe) postDto: PostDto,
        @GetUser() authDto: AuthDto): Promise<void> {
            console.log('user:',authDto)
            return this.postService.createPostService(postDto, authDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOnePost(@Param('id') id: string): Promise<PostDto | null> {
        return this.postService.findOnePostService(id);
    }


    //jwt auth + get user jwt
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletePost(
        @Param('id') id: string,
        @GetUser() authDto: AuthDto): Promise<void> {
            //service,repository validate user
            console.log('user:',authDto)
            return this.postService.deletePostService(id, authDto);
    }
    

    //jwt auth + get user jwt
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updatePost(
        @Param('id') id: string,
        @Body(ValidationPipe)postDto: PostDto,
        @GetUser() authDto: AuthDto): Promise<void> {
            //service,repository validate user
            console.log('user:',authDto)
            return this.postService.updatePostService(id, postDto, authDto);
    }


}
