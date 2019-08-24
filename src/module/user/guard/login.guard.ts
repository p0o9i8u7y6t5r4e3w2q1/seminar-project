import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * 擴展原本的權限守衛，使之能夠保存session
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
