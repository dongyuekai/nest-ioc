import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

// controllers是控制器 只能被注入
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
