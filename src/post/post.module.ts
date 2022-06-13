import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
    ],
    //mongooseModule -> adminjs로 접근하기위해 exports로 캡슐화(은닉) 해제
    //postRepository -> comment
    exports: [MongooseModule, PostRepository],
    controllers: [PostController],
    providers: [PostService, PostRepository],
})
export class PostModule {}
