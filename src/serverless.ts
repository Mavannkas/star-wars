import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Server } from 'http';
import { APIGatewayProxyHandler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as express from 'express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { writeFile } from 'fs/promises';

let cachedServer: Server;
const pemSource =
  'https://truststore.pki.rds.amazonaws.com/global/global-bundle.pem';
export const pemLocation = '/tmp/global-bundle.pem';

async function bootstrap(): Promise<Server> {
  const file = await fetch(pemSource);
  const pem = await file.text();
  await writeFile(pemLocation, pem);

  const expressApp = express();
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );
  const config = new DocumentBuilder()
    .setTitle('Star Wars API')
    .setDescription('The Star Wars API')
    .setVersion('1.0')
    .addTag('character')
    .addServer('/Prod', 'Production')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);
  await app.init();
  return createServer(expressApp);
}

export const handler: APIGatewayProxyHandler = async (event, context) => {
  if (!cachedServer) {
    cachedServer = await bootstrap();
  }
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
