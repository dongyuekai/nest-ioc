import {
  Injectable,
  OnModuleInit,
  OnApplicationBootstrap,
  OnModuleDestroy,
} from '@nestjs/common';
import { CreateBbbDto } from './dto/create-bbb.dto';
import { UpdateBbbDto } from './dto/update-bbb.dto';
import { AaaService } from 'src/aaa/aaa.service';

@Injectable()
export class BbbService
  implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy
{
  constructor(private aaaService: AaaService) {}
  create(createBbbDto: CreateBbbDto) {
    return 'This action adds a new bbb';
  }

  findAll() {
    return `This action returns all bbb` + this.aaaService.findAll();
  }

  findOne(id: number) {
    return `This action returns a #${id} bbb`;
  }

  update(id: number, updateBbbDto: UpdateBbbDto) {
    return `This action updates a #${id} bbb`;
  }

  remove(id: number) {
    return `This action removes a #${id} bbb`;
  }
  onModuleInit() {
    console.log('bbb.service---onModuleInit---');
  }
  onApplicationBootstrap() {
    console.log('bbb.service---onApplicationBootstrap---');
  }
  onModuleDestroy() {
    console.log('bbb.service---onModuleDestroy---');
  }
}
