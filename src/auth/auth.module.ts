import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }])],
  exports: [MongooseModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
