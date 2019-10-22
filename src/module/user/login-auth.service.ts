import { Injectable, Inject } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '../../model/entity';

@Injectable()
export class LoginAuthService {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  async validateUser(userID: string, pwd: string): Promise<User> {
    if (!userID || !pwd) return null;

    const user = await this.userService.findOneWithAuth(userID);
    if (user && user.checkPassword(pwd)) {
      return user;
    }

    return null;
  }

  async validatePayload(payload: any): Promise<User> {
    if (!payload) return null;

    const user = await this.userService.findOneWithAuth(payload.userID);
    return (user) ? user : null;
  }
}
