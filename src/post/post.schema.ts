import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {
  @Prop()
  nickname: string;

  @Prop()
  title: string;

  @Prop()
  contents: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);