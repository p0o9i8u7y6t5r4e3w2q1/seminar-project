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
  Session,
} from '@nestjs/common';
import { LoginGuard, AuthenticatedGuard } from './guard';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { Roles } from './decorator/roles.decorator';
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

  @Get('auths')
  @UseGuards(AuthenticatedGuard)
  async getAuths(@Session() session: any) {
    return session.passport.user.authIDs;
  }

  /**
   * 登出
   */
  @Post('logout')
  async logout(@Req() req: Request) {
    return req.logout();
  }

  /**
   * 註冊助教
   */
  @Post('signup')
  async signupTA(createDto: CreateUserDto) {
    return this.userService.signupTA(createDto);
  }

  @Get('find/:id')
  @Roles(RoleType.Staff)
  async findOne(id: string) {
    return await this.userService.findOne(id);
  }

  @Get('findAll')
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * 刪除帳號
   */
  @Delete('delete/:id')
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
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

  @Get('profile')
  @UseGuards(AuthenticatedGuard)
  async getProfile(@Session() session: any) {
    return session.passport.user;
  }

  /**
   * 更新個人資料
   */
  @Put('update')
  @UseGuards(AuthenticatedGuard)
  async update(@Session() session: any, updateDto: UpdateUserDto) {
    return await this.userService.update(session.passport.user.id, updateDto);
  }

  /**
   * 更新密碼
   */
  @Put('updatePassword')
  @UseGuards(AuthenticatedGuard)
  async updatePassword(
    @Session() session: any,
    @Body('oldPassword') oldPwd: string,
    @Body('newPassword') newPwd: string,
  ) {
    return await this.userService.updatePassword(
      session.passport.user.id,
      oldPwd,
      newPwd,
    );
  }

  /**
   * 更新角色
   */
  @Put('changeRole')
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async setRole(
    @Body('userID') userID: string,
    @Body('newRole') role: RoleType,
  ) {
    return await this.userService.setRole(userID, role);
  }
}
