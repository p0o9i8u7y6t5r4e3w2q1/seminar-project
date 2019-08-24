import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 確認使用者是否已經登入
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class AuthenticatedGuard extends AuthGuard('jwt') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    const request = context.switchToHttp().getRequest();

    if (request.jwt) {
      return request.jwt.pass;
    } else {
      return result;
    }
  }
}
