import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Inject,
} from '@nestjs/common';
import { AccessAuthService } from './access-auth.service';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(
    @Inject(AccessAuthService)
    private readonly authService: AccessAuthService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const scID: string = request.params.scID;

    const user = request.user;
    const sc = await this.authService.validateUser(user, scID);

    if (!sc) {
      return false;
    } else {
      request.semesterCourse = sc;
      return true;
    }
  }
}
