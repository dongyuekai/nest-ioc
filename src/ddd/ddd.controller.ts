import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnModuleDestroy,
  OnModuleInit,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DddService } from './ddd.service';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';

@Controller('ddd')
export class DddController
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private readonly dddService: DddService) {}

  @Post()
  create(@Body() createDddDto: CreateDddDto) {
    return this.dddService.create(createDddDto);
  }

  @Get()
  findAll() {
    return this.dddService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dddService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDddDto: UpdateDddDto) {
    return this.dddService.update(+id, updateDddDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dddService.remove(+id);
  }

  onModuleInit() {
    console.log('ddd.controller---onModuleInit---');
  }
  onApplicationBootstrap() {
    console.log('ddd.controller---onApplicationBootstrap---');
  }
  onModuleDestroy() {
    console.log('ddd.controller---onModuleDestroy---');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('ddd.controller---beforeApplicationShutdown---', signal);
  }
  onApplicationShutdown(signal?: string) {
    console.log('ddd.controller---onApplicationShutdown---', signal);
  }
}

// 生命周期说明

// 应用初始化的时候
// 首先，递归初始化模块，会一次调用模块内的controller、provider的onModuleInit方法，然后再调用module的onModuleInit方法
// 全部初始化完之后，再依次调用模块内的controller、provider的onApplicationBootstrap方法，然后调用module的onApplicationBootstrap方法
// 然后监听网络端口
// 之后Nest应用就正常运行了

// 应用销毁的时候也同样有生命周期
// 先调用每个模块的controller、provider的onModuleDestroy方法，然后调用Module的onModuleDestroy方法
// 之后再调用每个模块的controller、provider的beforeApplicationShutdown方法，然后调用Module的beforeApplicationShutdown方法
// 然后停止监听网络端口
// 之后调用每个模块的controller、provider的onApplicationShutdown方法，然后调用Module的onApplicationShutdown方法
// 之后停止进程
