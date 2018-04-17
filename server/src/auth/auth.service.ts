import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';
import { Component, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository, getCustomRepository } from 'typeorm';

import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { EmailService } from '../email/email.service';
import { Token } from './passport/token.interface';

@Component()
export class AuthService {
  private authRepository: AuthRepository;

  constructor(private readonly emailService: EmailService) {
    this.authRepository = getCustomRepository(AuthRepository)
   }

  public createToken(user: User): Token {
    const expiresIn = 60 * 60,
      secretOrKey = process.env.secret;
    const token = jwt.sign({id: user.id, role: user.role}, secretOrKey, { expiresIn });
    return {
      expires_in: expiresIn,
      id: token,
      userId: user.id
    };
  }

  async validateUser(signedUser): Promise<boolean> {
    if (signedUser.id && signedUser.exp > moment().unix())
    return true;
  }

  public async authenticate(email: string, password: string): Promise<Token> {
    const user = await this.authRepository.authenticate(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email and password combination');
    }

    return this.createToken(user);
  }

  public async create(userInfo): Promise<User> {
    if (!userInfo || !userInfo.email) {
      throw new BadRequestException('Email address is required');
    }
    const isUnique = await this.authRepository.verifyUniqueEmail(userInfo.email);
    if (!isUnique) {
      throw new BadRequestException('Email address must be unique');
    }

    const user: User = this.authRepository.create(userInfo);
    
    const verificationToken = await this.authRepository.assignVerificationToken(user);
    await this.sendVerificationToken(user);

    return await this.authRepository.savePassword(user, userInfo.password);
  }

  public async verify(token: string): Promise<boolean> {
    return await this.authRepository.verifyToken(token);
  }

  public async loggoutUser() {
    // With JWT you don't invalidate tokens so if in the future we do something about logging out we can add it here.
    return true;
  }

  private sendVerificationToken(user: User) {
    if (!user.verificationToken) {
      return;
    }

    this.emailService.sendVerification(user);
  }

}
