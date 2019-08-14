import { Injectable, Inject } from '@nestjs/common';
import { UserService } from '../user.service';

@Injectable()
export class LoginAuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  async validateUser(userID: string, pwd: string) {
    const user = await this.userService.findOne(userID);
    if (user && user.checkPassword(pwd)) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
