import { EntityRepository, Repository, EntityManager, FindManyOptions, DeepPartial } from 'typeorm';
import { User } from '../user/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {

  public async verifyUniqueEmail(email: string): Promise<boolean> {
    return await !this.findOneByEmail(email);
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({where: {email: email}});
  }

  public async findOneByResetToken(token: string): Promise<User> {
    return await this.findOne({where: {resetPasswordToken: token}});
  }

  public async findOneById(id: any, options?: FindManyOptions<User>): Promise<User> {
    const user = await super.findOneById(id);

    if (!user) {
      return null;
    }

    return this.removePrivateData(user);
  }

  public async find(options?: FindManyOptions<User>): Promise<User[]> {
    const users: User[] = await super.find(options);
    return users.map(this.removePrivateData);
  }

  // Removes private data from a user.
  // Mutates the user passed in.
  public removePrivateData(user: User): User {
    delete user.salt;
    delete user.password;
    delete user.verificationToken;
    delete user.resetPasswordExpires;
    delete user.resetPasswordToken;

    return user;
  }
}