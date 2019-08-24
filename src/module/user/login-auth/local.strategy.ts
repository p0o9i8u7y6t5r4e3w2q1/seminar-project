import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginAuthService } from './login-auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private readonly authService: LoginAuthService) {
    super({ usernameField: 'userID', passwordField: 'password' });
  }

  async validate(userID: string, password: string) {
    const user = await this.authService.validateUser(userID, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}