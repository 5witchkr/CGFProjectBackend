import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import * as session from 'express-session';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //cookie parser
  app.use(cookieParser());

  //cors
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  await app.listen(3000);
}
bootstrap();
