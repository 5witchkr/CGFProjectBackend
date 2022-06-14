import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNotEmpty, IsString } from 'class-validator';
import { Document, Types } from 'mongoose';



@Schema()
export class Comments extends Document {

    @Prop({
        required: true
    })
    @IsNotEmpty()
    @IsString()
    nickname: string;

    @Prop({
        type: Types.ObjectId,
        required: true,
        ref: 'post',
      })
      @IsNotEmpty()
      info: Types.ObjectId;

    @Prop()
    @IsNotEmpty()
    @IsString()
    commentBody: string;

    @Prop()
    date: Date;
}

export const CommentsSchema = SchemaFactory.createForClass(Comments);