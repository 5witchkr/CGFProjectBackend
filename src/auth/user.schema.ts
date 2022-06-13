import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {

  @Prop({
    unique: true
  })
  _id: string;

  @Prop({
    unique: true
  })
  email: string;

  @Prop({
    unique: true
  })
  nickname: string;

  @Prop()
  password: string;

  @Prop()
  company: boolean;

  @Prop()
  profileImage: string;
}

export const UserSchema = SchemaFactory.createForClass(User);