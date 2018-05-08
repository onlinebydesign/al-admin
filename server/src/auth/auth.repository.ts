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
    
    await this.save(user);

    this.removePrivateData(user);

    return user;
  }

  public async assignVerificationToken(user: User): Promise<User> {
    user.verificationToken = crypto.randomBytes(60).toString('base64');
    return await this.save(user);
  }

  public async assignResetToken(user: User): Promise<User> {
    user.resetPasswordToken = crypto.randomBytes(60).toString('base64');
    user.resetPasswordExpires = moment().add(7, 'day').unix();
    return await this.save(user);
  }

  public async verifyToken(token): Promise<boolean> {
    const users = await this.find({select: ['verificationToken'], where: {verificationToken: token}});
    if (users.length === 0) {
      return false;
    }

    users.forEach((user: User) => {
      user.verificationToken = null;
    });

    return await !!this.save(users);
  }

  private authenticateUser(user: User, password: string) {
    if (!user || !password) return false;
    return user.password === this.hashPassword(user, password) && !user.verificationToken;
  };
}