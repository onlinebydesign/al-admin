import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { InjectRepository, InjectEntityManager } from '@nestjs/typeorm';
import { Repository, getCustomRepository, EntityManager } from 'typeorm';
import { ObjectID } from 'mongodb';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  private userRepository: UserRepository;

  constructor(@InjectEntityManager() private entityManager: EntityManager) {
    this.userRepository = entityManager.getCustomRepository(UserRepository);
  }

  public async findAll(where): Promise<User[]> {
    let query;
    if (where) {
      query = {where};
    }
    
    return await this.userRepository.find(query);
  }

  public async find(id): Promise<User> {
    return await this.userRepository.findOneById(id);
  }

  // This would just be used when creating the user as an admin.
  public async create(userInfo): Promise<User> {
    const users: User[] = this.userRepository.create(userInfo);

    if (users.length > 0) {
      const user = users[0];
      this.userRepository.removePrivateData(user);
      return await this.userRepository.save(user);
    }

    return null;
  }

  /**
   * Updates a user from the user JSON object passed in. Returns the full user with the private data removed.
   * 
   * @param userId The ID of the user
   * @param userInfo A JSON object for the user which may or may not have the User ID
   */
  public async update(userId: string, userInfo: User): Promise<User> {
    if (!userInfo || !userId) {
      throw new BadRequestException('Invalid user data');
    }

    const user = await this.userRepository.updateOneById(userId, userInfo);

    return this.userRepository.removePrivateData(user);
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
