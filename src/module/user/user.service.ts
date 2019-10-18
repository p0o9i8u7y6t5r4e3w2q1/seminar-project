import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
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
    const user = await this.insertUser(createDto, RoleType.TA);
    this.savePerson(createDto, this.taRepository);

    return user;
  }

  /**
   * 註冊教授
   */
  async signupTeacher(createDto: CreateUserDto) {
    const user = await this.insertUser(createDto, RoleType.Teacher);
    this.savePerson(createDto, this.tchRepository);

    return user;
  }

  private async insertUser(createDto: CreateUserDto, roleID: RoleType) {
    const user = this.userRepository.create(createDto);
    this.userRepository.merge(user, { roleID });
    try {
      await this.userRepository.insert(user);
    } catch (error) {
      throw new BadRequestException(`user ${createDto.id} already exists`);
    }
    return user;
  }

  private async savePerson(
    createDto: CreateUserDto,
    repository: Repository<any>,
  ) {
    const person = await repository.findOne(createDto.id);
    if (!person) {
      await repository.insert(createDto as any);
    } else if (person.name !== createDto.name) {
      repository.merge(person, createDto as any);
      await repository.save(person);
    }
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
  async findAll(roleIDs?: RoleType[]) {
    let condition = null;
    if (roleIDs && roleIDs.length > 0) {
      condition = { roleID: In(roleIDs) };
    }

    return await this.userRepository.find(condition);
  }

  /**
   * 更新個人資料
   */
  async update(userID: string, updateDto: UpdateUserDto) {
    return await this.userRepository.update(userID, updateDto);
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
      throw new BadRequestException('wrong password');
    }
    return await this.userRepository.update(userID, { password: newPwd });
  }

  /**
   * 更新角色
   */
  async setRole(userID: string, role: RoleType) {
    return await this.userRepository.update(userID, { roleID: role });
  }

  async assignDeptHead(userID: string) {
    const teacher: User = await this.userRepository.findOne(userID);
    if (!teacher || teacher.roleID !== RoleType.Teacher) {
      throw new BadRequestException('Target user must be a Teacher');
    }

    await this.userRepository.update(
      { roleID: RoleType.DeptHead },
      { roleID: RoleType.Teacher },
    );
    await this.userRepository.update(userID, { roleID: RoleType.DeptHead });
  }
}
