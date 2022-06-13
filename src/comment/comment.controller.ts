import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentDto } from './dto/comment.dto';

@Controller('comment')
export class CommentController {
    constructor(private readonly commentService: CommentService) {}


    @Get()
    async GetComment() {
        return this.commentService.getComment();
    }


    @Post(':id')
    async createComment(
        @Param('id') id: string,
        @Body() commentdto: CommentDto,
    ) {
        return this.commentService.createComment(id, commentdto);
    }
}
