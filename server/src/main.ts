import { NestFactory } from '@nestjs/core';
import * as path from 'path';
import * as dotenv from 'dotenv';
import * as express from 'express';


import { ApplicationModule } from './app.module';
import { HttpExceptionFilter } from './filter/exception.filter';

async function bootstrap() {
  dotenv.config();

  const server = express();

  const app = await NestFactory.create(ApplicationModule, server);
  app.setGlobalPrefix('api');

  // Custom filtering
  app.useGlobalFilters(new HttpExceptionFilter());
  server.use(express.static('../client/dist/'));

  await app.listen(3001);

  // If they used an invalid path then serve them the index.html.
  server.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../client/dist/index.html'));
  });
}
bootstrap();
