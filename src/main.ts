import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as helmet from 'helmet';

export async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // allow cors
  app.enableCors({
    methods: 'GET,PUT,PATCH,POST,DELETE',
    allowedHeaders: [
      'X-HTTP-Method-Override',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
      'Authorization',
    ],
    optionsSuccessStatus: 200,
  });

  // 已經不使用 session ，改用jwt，所以不用此部分
  /* passport 設定 */
  // link: https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
  /* use jwt instead
  app.use(
    session({
      secret: 'seminar important secret', // 實際上不該寫出來，要用其他方式設定
      resave: false,
      saveUninitialized: true,
    }),
  );
  app.use(passport.initialize());
  app.use(passport.session());
   */

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  app.use(helmet());

  /* Swagger 設定 */
  const options = new DocumentBuilder()
    .setBasePath('api')
    .setTitle('Seminar Project')
    .setDescription('The backend API description')
    .setVersion('0.0.2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
