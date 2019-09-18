import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user.service';
import { classToPlain } from 'class-transformer';

@Injectable()
export class LoginAuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(userID: string, pwd: string) {
    const user = await this.userService.findOneWithAuth(userID);
    if (user && user.checkPassword(pwd)) {
      return classToPlain(user);
    }
    return null;
  }

  async validatePayload(payload: any) {
    const user = await this.userService.findOneWithAuth(payload.userID);
    return user;
  }
}
