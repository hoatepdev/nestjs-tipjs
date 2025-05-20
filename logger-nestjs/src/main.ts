/* eslint-disable @typescript-eslint/no-unused-vars */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MyLoggerDev } from './logger/my.loggger.dev';
import { MyLogger } from './logger/my.loggger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: new MyLogger(),
    // bufferLogs: true,
  });
  app.useLogger(new MyLogger());

  // app.useLogger(app.get(MyLoggerDev));
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
