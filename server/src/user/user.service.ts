import { Component, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getCustomRepository } from 'typeorm';
import { ObjectID } from 'mongodb';
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
    this.userRepository.removePrivateData(user);
    return await this.userRepository.save(user);
  }

  public async update(userId: string, userInfo: User): Promise<User> {
    if (!userInfo || !userId) {
      throw new BadRequestException('Invalid user data');
    }

    // Not sure if this is needed.
    userInfo.id = new ObjectID(userId);

    this.userRepository.removePrivateData(userInfo);
    return await this.userRepository.save(userInfo);
  }

  public async delete(userId: string): Promise<void> {
    if (!userId) {
      throw new BadRequestException('Invalid user ID');
    }
    const user = await this.userRepository.findOneById(userId);

    if (!user) {
      throw new BadRequestException('Invalid user ID');
    }

    await this.userRepository.deleteOne({_id: new ObjectID(userId)});

    return;
  }
}
