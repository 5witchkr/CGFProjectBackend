import { MailerModule } from '@nestjs-modules/mailer';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { JwtStrategy } from './jwt.strategy';
import { UserRepository } from './user.repository';
import { User, UserSchema } from './user.schema';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        expiresIn: 3600
      }
    }),
    MailerModule.forRoot({
      transport: {
        service: 'gmail',
        host: 'smtp.google.com',
        secure: 'false',
        port: 587,
        auth: {
          user: process.env.EMAIL_ID,
          pass: process.env.EMAIL_PASS,
        },
        template: {
          dir: process.cwd() + '/template/',
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports: [MongooseModule, JwtStrategy, PassportModule]
})
export class AuthModule {}
