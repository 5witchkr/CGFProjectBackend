import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  email: string;

  @Prop()
  nickname: string;

  @Prop()
  password: string;

  @Prop()
  company: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);