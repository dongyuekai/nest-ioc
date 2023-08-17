import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  OnApplicationBootstrap,
  OnModuleInit,
  OnModuleDestroy,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CreateCccDto } from './dto/create-ccc.dto';
import { UpdateCccDto } from './dto/update-ccc.dto';

@Controller('ccc')
export class CccController
  implements OnModuleInit, OnApplicationBootstrap, OnModuleDestroy
{
  constructor(private readonly cccService: CccService) {}

  @Post()
  create(@Body() createCccDto: CreateCccDto) {
    return this.cccService.create(createCccDto);
  }

  @Get()
  findAll() {
    return this.cccService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cccService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCccDto: UpdateCccDto) {
    return this.cccService.update(+id, updateCccDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cccService.remove(+id);
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
