import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as express from 'express';


import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './filter/exception.filter';
import { NotFoundExceptionFilter } from './filter/not-found-exception.filiter';

async function bootstrap() {
  dotenv.config();

  const server = express();

  const app = await NestFactory.create(ApplicationModule, server);
  app.setGlobalPrefix('api');

  // Custom filtering
  app.useGlobalFilters(new HttpExceptionFilter(), new NotFoundExceptionFilter);
  server.use(express.static('../client/dist/al-admin'));

  await app.listen(3001);

  // If they used an invalid path then serve them the index.html.
}
bootstrap();
