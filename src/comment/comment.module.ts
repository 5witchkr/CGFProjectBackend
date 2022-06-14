import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostModule } from 'src/post/post.module';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { Comments, CommentsSchema } from './comment.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Comments.name, schema: CommentsSchema },
    ]),
    PostModule,
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
