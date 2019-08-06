import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

/**
 * 確認使用者是否已經登入
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class AuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    return request.isAuthenticated();
  }
}
