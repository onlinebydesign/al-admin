import { Component, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository, getCustomRepository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

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

    // Create a user instance that can be saved to the database.
    const user: User = this.authRepository.create(userInfo);

    // Attach verification token to user.
    await this.authRepository.assignVerificationToken(user);
    
    // Email the user the email verification token.
    await this.emailService.sendVerification(user);;

    // Save the user and the password.
    return await this.authRepository.savePassword(user, userInfo.password);
  }

  public async verify(token: string): Promise<boolean> {
    return await this.authRepository.verifyToken(token);
  }

  public async loggoutUser() {
    // With JWT you don't invalidate tokens so if in the future we do something about logging out we can add it here.
    return true;
  }

  public async initiatePasswordReset(email: string): Promise<boolean> {
    if (!email) {
      throw new BadRequestException('Email address is required');
    }

    // Get the user associated with the email address.
    const user: User = await this.authRepository.findOneByEmail(email);
    
    if (!user) {
      return false;
    }
    
    // Attach reset token values to user.
    await this.authRepository.assignResetToken(user);
    
    // Email the user the email reset token.
    await this.emailService.sendResetPassword(user);
    
    return true;
  }

  public async validateResetToken(token: string): Promise<User> {
    if (!token) {
      throw new BadRequestException('Invalid reset email');
    }

    const user: User = await this.authRepository.findOneByResetToken(token);
    if (!user) {
      throw new BadRequestException('Invalid reset email');
    }
    if (user.resetPasswordExpires < moment().unix()) {
      throw new BadRequestException('Reset email has expired. Please request to reset passward again.')
    }

    return user;
  }

  public async resetPassword(token: string, password: string): Promise<User> {
    if (!password) {
      throw new BadRequestException('Password cannot be blank');
    }

    const user = await this.validateResetToken(token);

    user.resetPasswordToken = null;
    user.resetPasswordExpires = null;
    await this.authRepository.savePassword(user, password);
    
    this.authRepository.removePrivateData(user);
    return user;
  }


}
