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
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  ChangeRoleDto,
  UpdatePasswordDto,
} from './dto';
import { UserService } from './user.service';
import { Roles } from './decorator/roles.decorator';
import { RoleType } from '../../util';
import { ApiUseTags, ApiBearerAuth, ApiImplicitBody } from '@nestjs/swagger';
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
  @ApiImplicitBody({ name: 'loginDto', type: LoginDto, required: true })
  @Post('login')
  async login(@Req() req: Request) {
    return {
      result: req.user,
      token: this.tokenService.createByUser(req.user),
    };
  }

  @Get('userInfo')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async getUser(@Req() req: Request) {
    return req.user;
  }

  /**
   * 登出
   */
  @Post('logout')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: any) {
    return this.tokenService.addToBlacklist(req.jwt.token);
  }

  /**
   * 註冊助教
   */
  @Post('signup/ta')
  async signupTA(@Body() createDto: CreateUserDto) {
    return await this.userService.signupTA(createDto);
  }

  /**
   * 註冊教授
   */
  @Post('signup/teacher')
  async signupTeacher(@Body() createDto: CreateUserDto) {
    return await this.userService.signupTeacher(createDto);
  }

  @Get('find/:id')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @Get('findAll')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findAll() {
    return await this.userService.findAll();
  }

  /**
   * 刪除帳號
   */
  @Delete('delete/:id')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
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

  /**
   * 更新個人資料
   */
  @Put('update')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async update(@Req() req: any, @Body() updateDto: UpdateUserDto) {
    return await this.userService.update(req.user.id, updateDto);
  }

  /**
   * 更新密碼
   */
  @Put('updatePassword')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async updatePassword(@Req() req: any, @Body() updateDto: UpdatePasswordDto) {
    return await this.userService.updatePassword(
      req.user.id,
      updateDto.oldPassword,
      updateDto.newPassword,
    );
  }

  /**
   * 更新角色
   */
  @Put('changeRole')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async setRole(@Body() changeDto: ChangeRoleDto) {
    return await this.userService.setRole(changeDto.userID, changeDto.role);
  }
}
