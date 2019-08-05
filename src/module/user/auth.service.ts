import { Injectable, Inject } from '@nestjs/common';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(@Inject(UserService) private readonly userService: UserService) {}

  /**
   * 登入
   */
  async login(userID: string, password: string): Promise<void> {
    // TODO implement here
    const user = await this.userService.findOne(userID);
    // if (user.checkPassword(password)) {
    // }else{
    // }
    // save session
    return null;
  }

  /**
   * 登出
   */
  logout() {
    // TODO implement here
  }

  async validateUser() {}
}
