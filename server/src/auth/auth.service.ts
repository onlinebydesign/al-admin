import { Injectable, Inject, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { Repository, getCustomRepository, EntityManager } from 'typeorm';
import { InjectEntityManager } from '@nestjs/typeorm';
import * as jwt from 'jsonwebtoken';
import * as moment from 'moment';

import { User } from '../user/user.entity';
import { AuthRepository } from './auth.repository';
import { EmailService } from '../email/email.service';
import { Token } from './passport/token.interface';

@Injectable()
export class AuthService {
  // We are unable to use normal dependency injection since we are using a custom repository.
  private authRepository: AuthRepository;

  constructor(private readonly emailService: EmailService, @InjectEntityManager() private entityManager: EntityManager) {
    this.authRepository = entityManager.getCustomRepository(AuthRepository);
   }

  /**
   * Creates a JWT using the information from the user object
   * 
   * Uses:
   *   User.id
   *   User.role
   * 
   * @param user Instantiated user object.
   */
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

  /**
   * Validate that the JWT is valid.
   * 
   * @param signedUser Token object for JWT.
   */
  public async validateUser(signedUser: Token): Promise<boolean> {
    if (signedUser.id && signedUser.expires_in > moment().unix())
    return true;
  }

  /**
   * Authenticates the user using their email and password then returns a JWT for them to use on the front-end.
   * 
   * @param email User's email address
   * @param password User's unencrypted password
   */
  public async authenticate(email: string, password: string): Promise<Token> {
    const user = await this.authRepository.authenticate(email, password);

    if (!user) {
      throw new UnauthorizedException('Invalid email and password combination');
    }

    return this.createToken(user);
  }

  /**
   * Creates a user and sends the user a verification email.
   * 
   * @param userInfo An uninstantiated user or userlike object.
   */
  public async create(userInfo: User): Promise<User> {
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
    user.verificationToken = this.authRepository.getVerificationToken();
    
    // Email the user the email verification token.
    await this.emailService.sendVerification(user);

    // Save the user and the password.
    return await this.authRepository.savePassword(user, userInfo.password);
  }

  /**
   * This is for validating that the user received the email with the verification token.
   * 
   * @param token Should match the verification token created with the user.
   */
  public async verify(token: string): Promise<boolean> {
    return await this.authRepository.verifyToken(token);
  }

  /**
   *  With JWT you don't invalidate tokens. If in the future we do something about logging out we can add it here.
   */
  public async loggoutUser() {
    return true;
  }

  /**
   * Takes an email address and verifies that there is a user with that email and then assigns a reset token to the user
   * and sends them an email with a link to reset the password.
   * 
   * @returns True if we found a user with the email address false otherwise.
   */
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

  /**
   * Validates that the reset token is valid and that it hasn't expired yet.
   * 
   * @param token An email password reset token.
   */
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

  /**
   * Updates a users password to match the new one provided after validating that the reset token is valid.
   * 
   * @param token An email password reset token
   * @param password The new unencrypted password that will be used.
   */
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
