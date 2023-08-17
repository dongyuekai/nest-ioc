import {
  Module,
  OnModuleDestroy,
  OnModuleInit,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({
  controllers: [DddController],
  providers: [DddService],
})
export class DddModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onModuleInit() {
    console.log('ddd.module---onModuleInit---');
  }
  onApplicationBootstrap() {
    console.log('ddd.module---onApplicationBootstrap---');
  }
  onModuleDestroy() {
    console.log('ddd.module---onModuleDestroy---');
  }
  beforeApplicationShutdown() {
    console.log('ddd.module---beforeApplicationShutdown---');
  }
  onApplicationShutdown(signal?: string) {
    console.log('ddd.module---onApplicationShutdown---', signal);
  }
}
