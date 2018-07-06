import { Body, Controller, Get, Post, Param, Put, Patch, Delete, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UserService } from './user.service';
import { User } from './user.entity';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  public findAll(@Query() formId?: string): Promise<User[]> {
    return this.userService.findAll({formId});
  }

  @UseGuards(AuthGuard('jwt'))
  @Get(':id')
  public findOne(@Param() params): Promise<User> {
    return this.userService.find(params.id);
  }

  @UseGuards(AuthGuard('jwt'))
  @Patch(':id')
  @Put(':id')
  public update(@Param() params, @Body() user): Promise<User> {
    return this.userService.update(params.id, user);
  }

  @UseGuards(AuthGuard('jwt'))
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
