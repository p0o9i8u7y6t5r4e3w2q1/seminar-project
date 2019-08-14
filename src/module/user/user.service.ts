import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, TA, Role } from '../../model/entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RoleType } from '../../util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TA)
    private readonly taRepository: Repository<TA>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  /**
   * 登入
   */
  async login(user: Partial<User>) {
    return await this.roleRepository.findOne(user.roleID, {
      relations: ['auths'],
    });
  }

  /**
   * 註冊助教
   */
  async signupTA(createDto: CreateUserDto) {
    const user = this.userRepository.create(createDto);
    const ta = this.taRepository.create({ id: user.id, name: user.name });
    await this.taRepository.insert(ta);
    return await this.taRepository.insert(user);
  }

  /**
   * 找出指定的使用者
   */
  async findOne(userID: string) {
    return await this.userRepository.findOneOrFail(userID);
  }

  /**
   * 找出所有的使用者
   */
  async findAll() {
    return await this.userRepository.find();
  }

  /**
   * 更新個人資料
   */
  async update(userID: string, updateDto: UpdateUserDto) {
    return await this.update(userID, updateDto);
  }

  /**
   * 刪除帳號
   */
  async delete(id: string) {
    return await this.userRepository.delete(id);
  }

  /**
   * 忘記密碼
   */
  async forgetPassword() {
    // TODO implement here
    return null;
  }

  /**
   * 更新密碼
   */
  async updatePassword(userID: string, oldPwd: string, newPwd: string) {
    const user = await this.userRepository.findOneOrFail(userID);
    if (!user.checkPassword(oldPwd)) {
      throw new Error('password error');
    }
    return await this.userRepository.update(userID, { password: newPwd });
  }

  /**
   * 更新角色
   */
  async setRole(userID: string, role: RoleType) {
    return await this.userRepository.update(userID, { roleID: role });
  }
}
