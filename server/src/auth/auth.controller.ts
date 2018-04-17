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

  @Post('logout')
  public async logout() {
    return await this.authService.loggoutUser()
  }

  @Post()
  public async create(@Body() user): Promise<User> {
    console.dir(user);
    return this.authService.create(user);
  }
}
