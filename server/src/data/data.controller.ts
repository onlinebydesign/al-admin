import { Body, Controller, Get, Post, Param, Put, Patch, Delete, Query } from '@nestjs/common';

import { DataService } from './data.service';
import { Data } from './data.entity';

@Controller('data')
export class DataController {
  constructor(private readonly dataService: DataService) {}

  @Get()
  public findAll(@Query() query?: any): Promise<Data[]> {
    return this.dataService.findAll(query);
  }

  @Get(':id')
  public findOne(@Param() params): Promise<Data> {
    return this.dataService.find(params.id);
  }

  @Patch(':id')
  @Put(':id')
  public update(@Param() params, @Body() data): Promise<Data> {
    return this.dataService.update(params.id, data);
  }

  @Delete(':id')
  public delete(@Param() params): Promise<void> {
    return this.dataService.delete(params.id);
  }

  @Post()
  public async create(@Body() data): Promise<Data | Data[]> {
    const response = await this.dataService.create(data);
    return response;
  }

  @Put()
  public async updateAll(@Body() data: Data[]): Promise<Data[]> {
    if (!data || data.length === 0 || !Array.isArray(data)) return;

    const updatePromises: Promise<Data>[] = data.map(row => this.dataService.update(row.id, row))
    return await Promise.all(updatePromises);
  }

}
