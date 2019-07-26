import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../model/entity/user.entity';
import { TA } from '../../model/entity/ta.entity';
import { CreateUserDto } from './create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TA)
    private readonly taRepository: Repository<TA>,
  ) {}
  /**
   * 登入
   */
  async login(userID: string, password: string): Promise<void> {
    // TODO implement here
    const user = await this.userRepository.findOne(userID);
    //if (user.checkPassword(password)) {
    //}else{
    //}
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

  /**
   * 註冊助教
   */
  signupTA(createUserDto: CreateUserDto) {
    // TODO implement here
  }

  /**
   * 忘記密碼
   */
  forgetPassword(): void {
    // TODO implement here
    return null;
  }

  /**
   * 更新個人資料
   */
  update() {
    // TODO implement here
  }

  /**
   * 驗證密碼
   */
  validatePassword() {
    // TODO implement here
  }

  /**
   * 更新密碼
   */
  updatePassword() {
    // TODO implement here
  }

  /**
   * 更新角色
   */
  setRole() {
    // TODO implement here
  }
}
