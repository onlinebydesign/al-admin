import { EntityRepository, EntityManager } from 'typeorm';
import * as crypto from 'crypto';
import * as moment from 'moment';

import { User } from '../user/user.entity';
import { UserRepository } from '../user/user.repository';

@EntityRepository(User)
export class AuthRepository extends UserRepository {

  public hashPassword (user: User, password:string) {
    if (user.salt && password) {
      return crypto.pbkdf2Sync(password, user.salt, 10000, 64, 'SHA1').toString('base64');
    } else {
      return password;
    }
  };

  public async authenticate(email: string, password: string) {
    const user = await this.findOneByEmail(email);
    
    if (this.authenticateUser(user, password)) {
      return this.removePrivateData(user);
    }

    return; // TODO: Throw an error
  }

  public async savePassword(user: User, password: string) {
    user.salt = crypto.randomBytes(16).toString('base64');
    user.password = this.hashPassword(user, password);
    
    if (user.id) {
      await this.updateOneById(user.id, user);
    } else {
      await this.save(user);
    }

    this.removePrivateData(user);

    return user;
  }

  public getVerificationToken(): string {
    return crypto.randomBytes(60).toString('base64');
  }

  public async assignResetToken(user: User): Promise<User> {
    user.resetPasswordToken = crypto.randomBytes(60).toString('base64');
    user.resetPasswordExpires = moment().add(7, 'day').unix();
    await this.updateOneById(user.id, user);

    return user;
  }

  public async verifyToken(token): Promise<boolean> {
    const user = await this.findOne({select: ['verificationToken'], where: {verificationToken: token}});
    if (!user) {
      return false;
    }

    user.verificationToken = null;

    await this.updateOneById(user.id, user);

    return true;
  }

  private authenticateUser(user: User, password: string) {
    if (!user || !password) return false;
    return user.password === this.hashPassword(user, password) && !user.verificationToken;
  };
}