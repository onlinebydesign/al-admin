import { Component } from '@nestjs/common';
import * as Mailgun from 'mailgun-js';

import { User } from '../user/user.entity';

@Component()
export class EmailService {
  private mailgun;

  constructor() {
    this.mailgun = Mailgun({
      apiKey: process.env.mailgunAPIKey,
      domain: process.env.mailgunDomain
    });
  }

  public async send(data): Promise<Object> {
    return await this.mailgun.messages().send(data);
  }

  public sendTo(toEmail: string, data): Promise<Object> {
    const builtData = Object.assign({
      from: 'Al-Admin <noreply@obdstudios.com>',
      to: toEmail
    }, data);

    return this.send(builtData);
  }

  public sendVerification(user: User): Promise<Object> {
    const url = `${process.env.url}:${process.env.port}/api/auth/verify?token=${encodeURIComponent(user.verificationToken)}`;

    const data = {
      subject: 'Thank you for registering',
      html: `<h1>Thank You</h1>

      <p>
        Thanks for registering. Please follow the link below to complete your registration.
      </p>
      
      <p>
        <a href="${url}">${url}</a>
      </p>`,
      text: `Thank You
      
      Thanks for registering. Please follow the link below to complete your registration.
      
      ${url}
      `
    };

    return this.sendTo(user.email, data);
  }

  public sendResetPassword(user: User): Promise<Object> {
    const url = `${process.env.url}:${process.env.port}/api/auth/reset-password?token=${encodeURIComponent(user.resetPasswordToken)}`;

    const data = {
      subject: 'Password Reset Request',
      html: `<p>
        Click the link below to complete your password reset.
      </p>
      
      <p>
        <a href="${url}">${url}</a>
      </p>`,
      text: `Go to the link below to complete your password reset.
      
      ${url}
      `
    };

    return this.sendTo(user.email, data);
  }
}
