import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User, TA, Teacher } from '../../model/entity';
import { CreateUserDto, UpdateUserDto } from './dto';
import { RoleType } from '../../util';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(TA)
    private readonly taRepository: Repository<TA>,
    @InjectRepository(Teacher)
    private readonly tchRepository: Repository<Teacher>,
  ) {}

  /**
   * 註冊助教
   */
  async signupTA(createDto: CreateUserDto) {
    const user = this.userRepository.create(createDto);
    this.userRepository.merge(user, { roleID: RoleType.TA });
    const ta = this.taRepository.create({ id: user.id, name: user.name });
    await this.taRepository.insert(ta);
    return await this.userRepository.save(user);
  }

  /**
   * 註冊教授
   */
  async signupTeacher(createDto: CreateUserDto) {
    const user = this.userRepository.create(createDto);
    this.userRepository.merge(user, { roleID: RoleType.Teacher });
    const tch = this.tchRepository.create({ id: user.id, name: user.name });
    await this.tchRepository.insert(tch);
    return await this.userRepository.save(user);
  }

  /**
   * 找出指定的使用者
   */
  async findOne(userID: string) {
    return await this.userRepository.findOne(userID);
  }

  async findOneWithAuth(userID: string) {
    return await this.userRepository.findOne(userID, {
      relations: ['role', 'role.auths'],
    });
  }

  /**
   * 找出所有的使用者
   */
  async findAll(roleID?: RoleType) {
    let condition = null;
    if (roleID) {
      condition = { roleID };
    }

    return await this.userRepository.find(condition);
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
