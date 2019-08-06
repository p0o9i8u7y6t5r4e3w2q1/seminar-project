import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as passport from 'passport';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  /* passport 設定 */
  // link: https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
  app.use(
    session({
      secret: 'seminar important secret', // 實際上不該寫出來，要用其他方式設定
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());

  /* Swagger 設定 */
  const options = new DocumentBuilder()
    .setTitle('Seminar Project')
    .setDescription('The backend API description')
    .setVersion('1.0')
    .addTag('seminar')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
