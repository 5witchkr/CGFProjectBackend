import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop()
  nickname: string;

  @Prop()
  commentBody: string;

  @Prop()
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);