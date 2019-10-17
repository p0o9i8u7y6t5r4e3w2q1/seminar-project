import {
  UnauthorizedException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { LoginAuthService } from '../login-auth.service';

/**
 * 確認使用者是否已經登入，會把使用者資料放在req裡，因此所有一定要把這個guard擺在前面
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  constructor(
    @Inject(LoginAuthService)
    private readonly authService: LoginAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();
    const user = await this.authService.validatePayload(req.payload);
    if (!user) {
      throw new UnauthorizedException();
    }
    req.user = user;
    return true;
  }
}
