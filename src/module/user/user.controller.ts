import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Req,
  Inject,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { LoginGuard } from './guard';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { RoleType } from '../../util';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  /**
   * 登入
   */
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Req() req: Request) {
    // await this.authService.login(userId, password);
    return req.user;
  }

  /**
   * 登出
   */
  @Get('logout')
  async logout(@Req() req: Request) {
    req.logout();
  }

  /**
   * 註冊助教
   */
  @Post('signup')
  async signupTA(createDto: CreateUserDto) {
    return this.userService.signupTA(createDto);
  }

  @Get('find/:id')
  async findOne(id: string) {
    return await this.userService.findOne(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * 刪除帳號
   */
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  /**
   * 忘記密碼
   */
  // @Post()
  async forgetPassword() {
    return await this.userService.forgetPassword();
  }

  /**
   * 更新個人資料
   */
  @Put('update/:id')
  async update(@Param('id') userID: string, updateDto: UpdateUserDto) {
    return await this.userService.update(userID, updateDto);
  }

  /**
   * 更新密碼
   */
  @Put('updatePassword/:id')
  async updatePassword(
    @Param('id') userID: string,
    @Body('oldPassword') oldPwd: string,
    @Body('newPassword') newPwd: string,
  ) {
    return await this.userService.updatePassword(userID, oldPwd, newPwd);
  }

  /**
   * 更新角色
   */
  @Put('changeRole/')
  async setRole(
    @Body('userID') userID: string,
    @Body('newRole') role: RoleType,
  ) {
    return await this.userService.setRole(userID, role);
  }
}
