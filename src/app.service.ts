import { Injectable } from '@nestjs/common';

// service可以被注入也可以注入到别的对象 所以用 @injectable声明
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World2!';
  }
}
