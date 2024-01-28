import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  // clearFileContent(); //we can use this to clear the content of the log file
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('duacoder-handler/api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  const config = new DocumentBuilder()
    .setTitle('Duacoder Handler')
    .setDescription('Servicios de APIS que permitan consultas de los duacoders existentes')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
    const document = SwaggerModule.createDocument(app,config);
    SwaggerModule.setup('docs', app, document);
  await app.listen(3000);
}
bootstrap();