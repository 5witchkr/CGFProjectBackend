import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MailJwtStrategy } from './mail-jwt.strategy';
import { MailAuthController } from './mailauth.controller';
import { MailAuthService } from './mailauth.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    CacheModule.register({
      ttl: 180
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
    PassportModule.register({ defaultStrategy: 'jwt'}),
    JwtModule.register({
      secret: process.env.JWT_KEY,
      signOptions: {
        //잠깐 늘려놓을것임 원래 300(5분)
        expiresIn: 3000
      }
    }),
  ],
  controllers: [MailAuthController],
  providers: [MailAuthService,MailJwtStrategy],
  exports: [MailJwtStrategy, PassportModule]
})
export class MailauthModule {}
