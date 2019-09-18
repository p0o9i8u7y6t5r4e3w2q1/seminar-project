import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 原本為了擴展權限守衛，使之能夠保存session，但現在改用jwt
 * @link https://dev.to/nestjs/authentication-and-sessions-for-mvc-apps-with-nestjs-55a4
 */
@Injectable()
export class LoginGuard extends AuthGuard('local') {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const result = (await super.canActivate(context)) as boolean;
    // const request = context.switchToHttp().getRequest();
    // await super.logIn(request);
    return result;
  }
}
