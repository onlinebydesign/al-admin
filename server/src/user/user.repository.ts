import { ObjectID } from 'mongodb';
import { EntityRepository, EntityManager, FindManyOptions, DeepPartial, MongoRepository } from 'typeorm';
import { User } from '../user/user.entity';

@EntityRepository(User)
export class UserRepository extends MongoRepository<User> {

  public async verifyUniqueEmail(email: string): Promise<boolean> {
    const user = await this.findOneByEmail(email);
    return !user;
  }

  public async findOneByEmail(email: string): Promise<User> {
    return await this.findOne({where: {email: email}});
  }

  public async findOneByResetToken(token: string): Promise<User> {
    return await this.findOne({where: {resetPasswordToken: token}});
  }

  public async findOneById(id: any, options?: FindManyOptions<User>): Promise<User> {
    const user = await this.findById(id);

    if (!user) {
      return null;
    }

    return this.removePrivateData(user);
  }

  public async find(options?: FindManyOptions<User>): Promise<User[]> {
    const users: User[] = await super.find(options);
    return users.map(this.removePrivateData);
  }

  public async updateOneById(id: string | ObjectID, userInfo: User): Promise<User> {

    // Not sure if this is needed.
    delete userInfo.id;
    const databaseUser = await this.findById(id);
    const user = Object.assign(databaseUser, userInfo);

    return await super.save(user);
  }

  public findById(id: string | ObjectID): Promise<User> {
    return super.findOne(id);
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