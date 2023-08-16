import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [
    // AppService, // 这种写法也是class类型的token 经常这么用
    {
      provide: AppService, // 这里provider的token不是字符串 是class
      useClass: AppService,
    },
    {
      provide: 'app_service', // 这里provider的token可以为字符串
      useClass: AppService,
    },
    // 除了指定class外 还可以直接指定一个值 让IOC容器来注入
    {
      provide: 'person',
      useValue: {
        name: 'aaa',
        age: 20,
      },
    },
    // provider的值可能是动态产生的
    // 使用useFactory来动态创建一个对象
    {
      provide: 'person2',
      useFactory() {
        return {
          name: 'bbb',
          desc: 'ccc',
        };
      },
    },
    // 这个useFactory 也是支持参数的注入的
    {
      provide: 'person3',
      useFactory(person: { name: string }, appService: AppService) {
        return {
          name: person.name,
          desc: appService.getHello(),
        };
      },
      // 通过inject声明了两个token 一个是字符串token的person 一个是class token的AppService
      inject: ['person', AppService],
    },
    // useFactory支持异步
    {
      provide: 'person5',
      async useFactory() {
        await new Promise((resolve) => {
          setTimeout(resolve, 3000);
        });
        return {
          name: 'bbb',
          desc: 'cccc',
        };
      },
    },
    {
      provide: 'person4',
      useExisting: 'person2',
    },
  ],
})
export class AppModule {}
