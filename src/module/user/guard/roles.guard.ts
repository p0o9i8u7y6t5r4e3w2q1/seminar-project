import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';
import { RoleType } from '../../../util';
import { User } from '../../../model/entity';

/**
 * @link https://docs.nestjs.com/guards
 */
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());

    if (!roles) {
      // 若無限定通過角色，直接通過
      return true;
    }

    const request = context.switchToHttp().getRequest();
    let user: Partial<User>;
    if (request.session && request.session.passport) {
      user = request.session.passport.user;
    }
    const hasRole = () => roles.includes(user.roleID);
    return user && user.roleID && hasRole();
  }
}
