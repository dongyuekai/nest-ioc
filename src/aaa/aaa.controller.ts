import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  CanActivate,
  NestInterceptor,
  Injectable,
  ExecutionContext,
  UseGuards,
  CallHandler,
  PipeTransform,
  ArgumentMetadata,
  Catch,
  HttpException,
  ExceptionFilter,
  ArgumentsHost,
} from '@nestjs/common';
import { AaaService } from './aaa.service';
import { CreateAaaDto } from './dto/create-aaa.dto';
import { UpdateAaaDto } from './dto/update-aaa.dto';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

// 创建路由守卫 Guard
@Injectable()
export class RolesGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    return true;
  }
}

// 创建拦截器Interceptor
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    console.log('Before....');
    const now = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log(`After...${Date.now() - now}ms`)));
  }
}

// Pipe是管道的意思 用来对参数做一些检验和转换
@Injectable()
export class ValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value + `1122`;
  }
}

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus();

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
    });
  }
}

@Controller('aaa')
// @UseGuards(RolesGuard) // Guard 是路由守卫的意思，可以用于在调用某个 Controller 之前判断权限，返回 true 或者 false 来决定是否放行 单独使用 仅仅作用于此controller
export class AaaController {
  constructor(private readonly aaaService: AaaService) {}

  @Post()
  create(@Body() createAaaDto: CreateAaaDto) {
    return this.aaaService.create(createAaaDto);
  }

  @Get()
  findAll() {
    return this.aaaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.aaaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAaaDto: UpdateAaaDto) {
    return this.aaaService.update(+id, updateAaaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.aaaService.remove(+id);
  }
}

// Nest中关于AOP的说明
// Nest的Middleware、Guard、Interceptor、Pipe、ExceptionFilter都是AOP思想的实现，只不过是不同位置的切面，它们都可以灵活的作用在某个路由或者全部路由，这就是 AOP 的优势。
// 我们通过源码来看了它们的调用顺序，Middleware 是 Express 的概念，在最外层，到了某个路由之后，会先调用 Guard，Guard 用于判断路由有没有权限访问，然后会调用 Interceptor，对 Contoller 前后扩展一些逻辑，在到达目标 Controller 之前，还会调用 Pipe 来对参数做检验和转换。所有的 HttpException 的异常都会被 ExceptionFilter 处理，返回不同的响应。
// Nest 就是通过这种 AOP 的架构方式，实现了松耦合、易于维护和扩展的架构。
