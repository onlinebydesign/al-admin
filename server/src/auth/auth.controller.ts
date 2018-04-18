import { Body, Controller, Post, HttpStatus, HttpCode, Get, Query, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/user.entity';
import { Token } from './passport/token.interface';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('authorized')
  public async authorized() {
    console.log('Authorized route...');
  }

  @Get('verify')
  public async verify(@Query() query, @Res() res) {
    if (!query.token) {
      return res.status(400).send('No verify token is included');
    }
    const verified = await this.authService.verify(query.token);
    if (verified) {
      return res.redirect('/auth/login');
    }

    return res.status(400).send('Unable to verify token');
  }

  @Post('login')
  public async login(@Body() body): Promise<Token> {
    return await this.authService.authenticate(body.email, body.password);
  }

  // Currently this does nothing as the JWT doesn't allow for invalidating tokens. We should be having them refresh the token regularly.
  // We might consider having a blacklist for invalidating tokens but then we loose the advantage of JWT.
  @Post('logout')
  public async logout() {
    return await this.authService.loggoutUser()
  }

  @Post('reset')
  public async reset(@Body() body): Promise<boolean> {
    return await this.authService.initiatePasswordReset(body.email);
  }

  // TODO: It would be nice if there was a way to validate the reset token before they start typing the new password.
  @Get('reset-password')
  public async validateResetToken(@Query() query, @Res() res) {
    if (!query.token) {
      return res.status(400).send('No reset token is included');
    }
    const user = await this.authService.validateResetToken(query.token);
    if (user) {
      return res.redirect(`/auth/reset-password?resetToken=${encodeURIComponent(query.token)}`);
    }

    return res.status(400).send('Unable to verify token');
  }

  // TODO: It would be nice if there was a way to validate the reset token before they start typing the new password.
  @Post('reset-password')
  public async resetPassword(@Body() body, @Query() query): Promise<User> {
    return await this.authService.resetPassword(query.resetToken, body.password);
  }

  @Post()
  public async create(@Body() user): Promise<User> {
    console.dir(user);
    return this.authService.create(user);
  }

}
