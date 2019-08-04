import { Controller, Get, Post, Put, Inject } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}
  /**
   * 登入
   */
  @Post('login')
  async login(userId: string, password: string) {
    // TODO implement here
    await this.userService.login(userId, password);
  }

  /**
   * 登出
   */
  @Get()
  logout() {
    // TODO implement here
  }

  /**
   * 註冊助教
   */
  @Post()
  signupTA(createDto: CreateUserDto) {
    // TODO implement here
    this.userService.signupTA(createDto);
  }

  /**
   * 忘記密碼
   */
  @Post()
  forgetPassword(): void {
    // TODO implement here
    return null;
  }

  /**
   * 更新個人資料
   */
  @Put()
  update() {
    // TODO implement here
  }

  /**
   * 驗證密碼
   */
  @Post()
  validatePassword() {
    // TODO implement here
  }

  /**
   * 更新密碼
   */
  @Post()
  updatePassword() {
    // TODO implement here
  }

  /**
   * 更新角色
   */
  @Put()
  setRole() {
    // TODO implement here
  }
}
