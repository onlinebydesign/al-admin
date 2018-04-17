import { NestFactory } from '@nestjs/core';
import { ApplicationModule } from './app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();

  const app = await NestFactory.create(ApplicationModule);
  app.setGlobalPrefix('api');

  await app.listen(3001);
}
bootstrap();
