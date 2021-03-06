import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
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
  ],
  controllers: [MailAuthController],
  providers: [MailAuthService],
  exports: [CacheModule],
})
export class MailauthModule {}
