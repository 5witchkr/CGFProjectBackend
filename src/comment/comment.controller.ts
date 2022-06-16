import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { AuthDto } from 'src/auth/dto/auth.dto';
import { GetUser } from 'src/auth/get-user.decorator';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}


    //todo promise
    @Get()
    @UseGuards(JwtAuthGuard)
    async GetComment() {
        return this.commentService.getComment();
    }


    @Post(':id')
    @UseGuards(JwtAuthGuard)
    async createComment(
        @Param('id') id: string,
        @GetUser() authDto: AuthDto,
        @Body() commentdto: CommentDto,
    ) {
        return this.commentService.createComment(id, commentdto, authDto);
    }
}
