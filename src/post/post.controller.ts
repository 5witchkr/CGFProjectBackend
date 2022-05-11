import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards, ValidationPipe } from '@nestjs/common';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/auth/get-user.decorator';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { PostDto } from './dto/post.dto';
import { PostTestDto } from './dto/postTest.dto';
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
    //todo jwt auth + get user jwt
    @Post('create')
    @UseGuards(JwtAuthGuard)
    createPost(
        @Body(ValidationPipe) postTestDto: PostTestDto,
        @GetUser() authDto: AuthDto): Promise<void> {
            console.log('user:',authDto)
            return this.postService.createPostService(postTestDto, authDto);
    }

    @Get(':id')
    @UseGuards(JwtAuthGuard)
    getOnePost(@Param('id') id: string): Promise<PostDto | null> {
        return this.postService.findOnePostService(id);
    }


    //todo jwt auth + get user jwt
    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    deletePost(
        @Param('id') id: string,
        @GetUser() authDto: AuthDto): Promise<void> {
            //tood service,repository validate user
            console.log('user:',authDto)
            return this.postService.deletePostService(id);
    }
    
    


    //todo jwt auth + get user jwt
    @Put(':id')
    @UseGuards(JwtAuthGuard)
    updatePost(
        @Param('id') id: string,
        @Body(ValidationPipe)postDto: PostDto,
        @GetUser() authDto: AuthDto): Promise<void> {
            //tood service,repository validate user
            console.log('user:',authDto)
            return this.postService.updatePostService(id,postDto);
    }


}
