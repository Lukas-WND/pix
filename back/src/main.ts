import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from 'cookie-parser';
// import { SessionBuilder } from '@ngrok/ngrok';
// import { Logger } from '@nestjs/common';

import { config } from 'dotenv';

config();

async function bootstrap() {
  const port = 3000;
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });

  app.use(cookieParser());

  await app.listen(port);

  // Setup Ngrok
  // const session = await new SessionBuilder()
  //   .authtokenFromEnv()
  //   .connect();

  // const listener = await session.httpEndpoint().listen();
  // new Logger('main').log(`Ingress established at ${listener.url()}`);

  // listener.forward(`localhost:${port}`)
}

bootstrap();
