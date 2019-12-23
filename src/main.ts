require('dotenv').config(); // must be first

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { frontendHook } from './frontend-hook';
import * as fastifyStatic from 'fastify-static';
import * as helmet from 'helmet';
import * as compress from 'fastify-compress';

// const FRONTEND_PREFIX = process.env.FRONTEND_DIR || '/../client';
const FRONTEND_PREFIX = '/../client';
// const FRONTEND_PREFIX = '/../../seminar-frontend/dist/seminar-frontend';

export async function bootstrap() {
  const fastify = new FastifyAdapter();
  fastify.register(compress);
  fastify.register(fastifyStatic, {
    root: __dirname + FRONTEND_PREFIX,
  });
  fastify.getInstance().addHook('preHandler', frontendHook);

  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastify,
  );
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  // allow cors
  app.enableCors();

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
  let options: any = new DocumentBuilder();
  if (process.env.SWAGGER_SCHEME) {
    options = options.setSchemes(process.env.SWAGGER_SCHEME);
  } else if (process.env.PORT) {
    // for online production
    options = options.setSchemes('https');
  } else {
    // for local development
    options = options.setSchemes('http');
  }
  options = options
    .setBasePath('api')
    .setTitle('Seminar Project')
    .setDescription('The backend API description')
    .setVersion('0.0.2')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3000, '0.0.0.0');
}
bootstrap();
