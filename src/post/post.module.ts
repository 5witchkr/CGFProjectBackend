import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Post, PostSchema } from './post.schema';

@Module({
    imports: [MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }])
    ],
    //adminjs로 접근하기위해 exports로 캡슐화(은닉) 해제
    exports: [MongooseModule],
})
export class PostModule {}
