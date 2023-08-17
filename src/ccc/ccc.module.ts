import {
  Module,
  OnModuleDestroy,
  OnApplicationBootstrap,
  OnModuleInit,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy
{
  onModuleInit() {
    console.log('ccc.module---onModuleInit---');
  }
  onApplicationBootstrap() {
    console.log('ccc.module---onApplicationBootstrap---');
  }
  onModuleDestroy() {
    console.log('ccc.module---onModuleDestroy---');
  }
}
