import { ExtractJwt, Strategy } from 'passport-jwt';
import { Token } from './token.interface';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super(
      {
        jwtFromRequest: ExtractJwt.fromHeader("authorization"),
        // passReqToCallback: true,
        secretOrKey: process.env.secret,
      },
      // async (req, payload, next) => await this.verify(req, payload, next),
    );
  }

  // public async verify(req, payload, done) {
  //   const isValid = await this.authService.validateUser(payload);
  //   if (!isValid) {
  //     return done('Unauthorized', false);
  //   }
  //   done(null, payload);
  // }

  async validate(payload: Token, done: Function) {
    const user = await this.authService.validateUser(payload);
    if (!user) {
      return done(new UnauthorizedException(), false);
    }
    done(null, user);
  }

}
