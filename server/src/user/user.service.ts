import { Component, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getCustomRepository } from 'typeorm';

import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Component()
export class UserService {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepository)
   }

  public async findAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  public async find(id): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  // This would just be used when creating the user as an admin.
  public async create(userInfo): Promise<User> {
    const user: User = this.userRepository.create(userInfo);
    return await this.userRepository.save(user);
  }

}
