import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PostDocument = Post & Document;

@Schema()
export class Post {

  @Prop()
  _id: string;

  @Prop()
  nickname: string;

  @Prop()
  title: string;

  @Prop()
  contents: string;

  @Prop()
  date: Date;
}

export const PostSchema = SchemaFactory.createForClass(Post);