import {
  Injectable,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Injectable()
export class CccService
  implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy
{
  create(createCccDto: CreateCccDto) {
    return 'This action adds a new ccc';
  }

  findAll() {
    return `This action returns all ccc`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ccc`;
  }

  update(id: number, updateCccDto: UpdateCccDto) {
    return `This action updates a #${id} ccc`;
  }

  remove(id: number) {
    return `This action removes a #${id} ccc`;
  }
  onModuleInit() {
    console.log('ccc.controller---onModuleInit---');
  }
  onApplicationBootstrap() {
    console.log('ccc.controller---onApplicationBootstrap---');
  }
  onModuleDestroy() {
    console.log('ccc.controller---onModuleDestroy---');
  }
}
