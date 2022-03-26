import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: 'switch1234',
      signOptions: {
        expiresIn: 3600
      }
    }),
  ],
  exports: [MongooseModule],
  controllers: [AuthController],
  providers: [AuthService, UserRepository]
})
export class AuthModule {}
