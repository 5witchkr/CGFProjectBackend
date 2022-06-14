import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, SchemaOptions } from 'mongoose';
import { Comments } from 'src/comment/comment.schema';

const options: SchemaOptions = {
  timestamps: true,
};

@Schema(options)
export class Post extends Document {
  @Prop()
  nickname: string;

  @Prop()
  title: string;

  @Prop()
  contents: string;

  @Prop()
  date: Date;


  readonly readOnlyData: {
    id: string;
    nickname: string;
    title: string;
    contents: string;
    date: Date;
    comments: Comments[];
  };

  readonly comments: Comments[];
}

const _PostSchema = SchemaFactory.createForClass(Post);

_PostSchema.virtual('readOnlyData').get(function (this: Post) {
  return {
    id: this.id,
    nickname: this.nickname,
    title: this.title,
    contents: this.contents,
    date: this.date,
    comments: this.comments,
  };
});

_PostSchema.virtual('comments', {
  ref: 'comments',
  localField: '_id',
  foreignField: 'info',
});
_PostSchema.set('toObject', { virtuals: true });
_PostSchema.set('toJSON', { virtuals: true });

export const PostSchema = _PostSchema;