import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  LoggingInterceptor,
  RolesGuard,
  ValidationPipe,
} from './aaa/aaa.controller';

// 入口模块
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 通过app.usexxx的形式作为全局使用 作用于全部controller
  app.useGlobalGuards(new RolesGuard());
  app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
}
bootstrap();
