import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { json } from 'body-parser';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
require('dotenv').config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.enableCors();
  app.use(json({ limit: '50mb' }));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: false,
    }),
  );

  app.setGlobalPrefix('duacoder-handler/api/v1');

  // const config = new DocumentBuilder().setTitle('Duacoder Handler').setDescription('Servicios de APIS que permitan consultas de los duacoders existentes').setVersion('1.0').build();
  // const document = SwaggerModule.createDocument(app,config);
  // SwaggerModule.setup('docs', app, document);

  await app.listen(+process.env.APP_PORT);
  
}
bootstrap();
