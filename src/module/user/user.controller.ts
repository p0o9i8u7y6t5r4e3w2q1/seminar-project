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
import { LoginGuard, AuthenticatedGuard, RolesGuard } from './guard';
import { Request } from 'express';
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { Roles } from './decorator/roles.decorator';
import { RoleType } from '../../util';
import { ApiUseTags } from '@nestjs/swagger';
import { TokenService } from './jwt/token.service';

@ApiUseTags('user')
@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(TokenService)
    private readonly tokenService: TokenService,
  ) {}

  /**
   * 登入
   */
  @UseGuards(LoginGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return {
      user: req.user,
      token: this.tokenService.createByUser(req.user),
    };
  }

  @Get('userInfo')
  @UseGuards(AuthenticatedGuard)
  async getUser(@Req() req: Request) {
    const { password, role, ...result } = req.user;
    return { user: result };
  }

  /**
   * 登出
   */
  @Post('logout')
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: any) {
    return this.tokenService.addToBlacklist(req.jwt.token);
  }

  /**
   * 註冊助教
   */
  @Post('signup/ta')
  async signupTA(createDto: CreateUserDto) {
    return { user: await this.userService.signupTA(createDto) };
  }

  /**
   * 註冊教授
   */
  @Post('signup/teacher')
  async signupTeacher(createDto: CreateUserDto) {
    return { user: await this.userService.signupTeacher(createDto) };
  }

  @Get('find/:id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findOne(id: string) {
    return { user: await this.userService.findOne(id) };
  }

  @Get('findAll')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findAll() {
    return { users: await this.userService.findAll() };
  }

  /**
   * 刪除帳號
   */
  @Delete('delete/:id')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async delete(@Param('id') id: string) {
    return { result: await this.userService.delete(id) };
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
  @Put('update')
  @UseGuards(AuthenticatedGuard)
  async update(@Req() req: Request, updateDto: UpdateUserDto) {
    return { result: await this.userService.update(req.user.id, updateDto) };
  }

  /**
   * 更新密碼
   */
  @Put('updatePassword')
  @UseGuards(AuthenticatedGuard)
  async updatePassword(
    @Req() req: Request,
    @Body('oldPassword') oldPwd: string,
    @Body('newPassword') newPwd: string,
  ) {
    return {
      result: await this.userService.updatePassword(
        req.user.id,
        oldPwd,
        newPwd,
      ),
    };
  }

  /**
   * 更新角色
   */
  @Put('changeRole')
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async setRole(
    @Body('userID') userID: string,
    @Body('newRole') role: RoleType,
  ) {
    return { result: await this.userService.setRole(userID, role) };
  }
}
