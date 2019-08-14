import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { AccessAuthService } from './access-auth.service';
import { User } from '../../../model/entity';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @Inject(AccessAuthService)
    private readonly authService: AccessAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    let scID: string;
    if (request.param) {
      scID = request.params.scID;
    }

    let user: Partial<User>;
    if (request.session && request.session.passport) {
      user = request.session.passport.user;
    }
    const sc = await this.authService.validateUser(user, scID);

    if (!sc) {
      return false;
    } else {
      request.semesterCourse = sc;
      return true;
    }
  }
}
