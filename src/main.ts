import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  SwaggerModule,
  DocumentBuilder,
  SwaggerCustomOptions,
} from '@nestjs/swagger';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import * as dotenv from 'dotenv'; // Import dotenv

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
  .setTitle('Authentication API')
  .setDescription("The authentication BackEnd API")
  .setVersion('1.0')
  .addTag('auth.ir')
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app,config);
  const customOptions:SwaggerCustomOptions={
    swaggerOptions:{
      presistAuthorization:true,
    },
    customSiteTitle:"Siavash Auth API Docs",
  };
  SwaggerModule.setup('/api-docs',app,document,customOptions);

  //global app config:
  app.enableCors();
  //app.setGlobalPrefix('api/v1');
  app.useGlobalPipes(new ValidationPipe());

  app.enableVersioning({
    type:VersioningType.URI
  });
  dotenv.config();
  await app.listen(4000);
}
bootstrap();
