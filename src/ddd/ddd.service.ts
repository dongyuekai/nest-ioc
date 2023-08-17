import {
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
  OnApplicationBootstrap,
  BeforeApplicationShutdown,
  OnApplicationShutdown,
} from '@nestjs/common';
import { CreateDddDto } from './dto/create-ddd.dto';
import { UpdateDddDto } from './dto/update-ddd.dto';

@Injectable()
export class DddService
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  create(createDddDto: CreateDddDto) {
    return 'This action adds a new ddd';
  }

  findAll() {
    return `This action returns all ddd`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ddd`;
  }

  update(id: number, updateDddDto: UpdateDddDto) {
    return `This action updates a #${id} ddd`;
  }

  remove(id: number) {
    return `This action removes a #${id} ddd`;
  }
  onModuleInit() {
    console.log('ddd.service---onModuleInit---');
  }
  onApplicationBootstrap() {
    console.log('ddd.service---onApplicationBootstrap---');
  }
  onModuleDestroy() {
    console.log('ddd.service---onModuleDestroy---');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('ddd.service---beforeApplicationShutdown---', signal);
  }
  onApplicationShutdown(signal?: string) {
    console.log('ddd.service---onApplicationShutdown---', signal);
  }
}
