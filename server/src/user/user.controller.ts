import { Body, Controller, Get, Post, Param, Put, Patch, Delete } from '@nestjs/common';

import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  public findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  public findOne(@Param() params): Promise<User> {
    return this.userService.find(params.id);
  }

  @Patch(':id')
  @Put(':id')
  public update(@Param() params, @Body() user): Promise<User> {
    return this.userService.update(params.id, user);
  }

  @Delete(':id')
  public delete(@Param() params): Promise<void> {
    return this.userService.delete(params.id);
  }

  @Post()
  public create(@Body() user): Promise<User> {
    console.dir(user);
    return this.userService.create(user);
  }
}