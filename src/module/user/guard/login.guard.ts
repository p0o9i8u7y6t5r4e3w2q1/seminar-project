import {
  UnauthorizedException,
  ExecutionContext,
  Injectable,
  Inject,
  CanActivate,
} from '@nestjs/common';
import { LoginAuthService } from '../login-auth.service';
import { User } from '../../../model/entity';

/**
 * 原本為了擴展權限守衛，使之能夠保存session，但現在改用jwt，所以改用單純登入
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class LoginGuard implements CanActivate {
  constructor(
    @Inject(LoginAuthService) private readonly authService: LoginAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    const body = req.body;
    const user: User = await this.authService.validateUser(
      body.userID,
      body.password,
    );

    if (!user) {
      throw new UnauthorizedException();
    }
    req.user = user;
    return true;
  }
}
