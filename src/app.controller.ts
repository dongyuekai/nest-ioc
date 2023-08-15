import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

// controllers是控制器 只能被注入
// Controller依赖了Service实现业务逻辑  Service依赖了Repository来做增删改查
// Repository依赖DataSource来建立连接 DataSource又需要从Config对象拿到用户名密码等信息
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(
    @Inject('app_service')
    private readonly appService: AppService,
    @Inject('person')
    private readonly person: { name: string; age: number },
  ) {}

  @Get()
  getHello(): string {
    console.log(this.person);
    return this.appService.getHello();
  }
}

// Controller对象：接收http请求 调用Service 返回响应
// Service对象 实现业务逻辑
// Repository对象：实现对数据库的增删改查

// 示意代码
// const config = new Config({ username: 'dyk', password: 'pwd' });
// const dataSource = new DataSource(config);
// const repository = new Repository(dataSource);
// const service = new Service(repository);
// const controller = new Controller(service);

// IOC实现思路：在class上声明依赖了啥 然后让工具去分析我声明的依赖关系 根据先后顺序自动把对象创建好了 然后组装起来
// 它有一个放对象的容器，程序初始化的时候会扫描class上声明的依赖关系，然后把这些class都给new一个实例放到容器里
// 创建对象的时候还会把他们依赖的对象注入进去
// 这样依赖注入的方式叫做 DI (Dependency Injection)

// 这种方案叫IOC：本来是手动new依赖对象 然后组装起来 现在是声明依赖了啥 等待被注入
// 从主动创建依赖到被动等待依赖注入 这就是 Inverse of Control 反转控制

// AppService声明了@Injectable 代表这个class可注入 那么nest就会把它的对象放到IOC容器里
// AppController声明了@Controller 代表这个class可以被注入 nest也会把它放到IOC容器里
// 为什么Controller是单独的装饰器呢？因为Service是可以被注入也可以注入到别的对象的，所以用@Injectable声明
// 而Controller字需要被注入 所以 nest 单独给它加了 @Controller 的装饰器
// 然后再AppModule里引入 通过 @Module 声明模块 其中 controller是控制器 只能被注入
// providers里可以被注入 也可以注入别的对象 比如这里的 AppService
