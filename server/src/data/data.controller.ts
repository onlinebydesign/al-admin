import { Body, Controller, Get, Post, Param, Put, Patch, Delete, Query } from '@nestjs/common';

import { DataService } from './data.service';
import { Data } from './data.entity';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  public findAll(@Query() formId?: string): Promise<Data[]> {
    return this.dataService.findAll({formId});
  }

  @Get(':id')
  public findOne(@Param() params): Promise<Data> {
    return this.dataService.find(params.id);
  }

  @Patch(':id')
  @Put(':id')
  public update(@Param() params, @Body() user): Promise<Data> {
    return this.dataService.update(params.id, user);
  }

  @Delete(':id')
  public delete(@Param() params): Promise<void> {
    return this.dataService.delete(params.id);
  }

  @Post()
  public async create(@Body() data): Promise<Data | Data[]> {
    console.dir(data);
    const response = await this.dataService.create(data);
    console.dir(response);
    return response;
  }
}
