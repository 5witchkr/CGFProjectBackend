import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PostRepository } from './post.repository';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
    ],
    //adminjs로 접근하기위해 exports로 캡슐화(은닉) 해제
    exports: [MongooseModule],
    controllers: [PostController],
    providers: [PostService, PostRepository],
})
export class PostModule {}
