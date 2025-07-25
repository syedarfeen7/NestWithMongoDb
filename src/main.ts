import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './shared/exceptions/http-exception-filter';
import { ValidationPipe } from '@nestjs/common';
import * as express from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.use('/uploads', express.static(join(__dirname, '..', 'uploads')));
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(8080);
}
bootstrap();
