import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Query,
  Req,
  Inject,
  Param,
  Body,
  UseGuards,
  HttpCode,
} from '@nestjs/common';
import { LoginGuard, AuthenticatedGuard, RolesGuard } from './guard';
import {
  CreateUserDto,
  UpdateUserDto,
  LoginDto,
  ChangeRoleDto,
  UpdatePasswordDto,
} from './dto';
import { UserService } from './user.service';
import { Roles } from './decorator/roles.decorator';
import { RoleType, SUCCESS } from '../../util';
import {
  ApiUseTags,
  ApiBearerAuth,
  ApiImplicitBody,
  ApiImplicitQuery,
  ApiOperation,
} from '@nestjs/swagger';
import { PayloadService } from '../shared/jwt';
import { classToPlain } from 'class-transformer';

@ApiUseTags('user')
@Controller()
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
    @Inject(PayloadService)
    private readonly payloadService: PayloadService,
  ) {}

  /**
   * 登入
   */
  @ApiOperation({ title: '登入' })
  @UseGuards(LoginGuard)
  @ApiImplicitBody({ name: 'loginDto', type: LoginDto, required: true })
  @Post('user/login')
  async login(@Req() req: any) {
    return {
      result: classToPlain(req.user),
      token: this.payloadService.makeTokenByUser(req.user),
    };
  }

  @ApiOperation({ title: '取得目前登入的使用者資料' })
  @Get('user/info')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async getUser(@Req() req: any) {
    return req.user;
  }

  /**
   * 更新個人資料
   */
  @ApiOperation({ title: '更新目前登入的使用者資料' })
  @Put('user/info')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async update(@Req() req: any, @Body() updateDto: UpdateUserDto) {
    await this.userService.update(req.user.id, updateDto);
    return SUCCESS;
  }

  /**
   * 更新密碼
   */
  @ApiOperation({ title: '更新目前登入的密碼' })
  @Put('user/password')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async updatePassword(@Req() req: any, @Body() updateDto: UpdatePasswordDto) {
    await this.userService.updatePassword(
      req.user.id,
      updateDto.oldPassword,
      updateDto.newPassword,
    );
    return SUCCESS;
  }

  /**
   * 登出
   */
  @HttpCode(204)
  @ApiOperation({ title: '登出' })
  @Post('user/logout')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  async logout(@Req() req: any) {
    this.payloadService.blacklisted(req.payload);
    delete req.payload;
  }

  /**
   * 註冊助教
   */
  @ApiOperation({ title: '註冊助教' })
  @Post('users/TA')
  async signupTA(@Body() createDto: CreateUserDto) {
    return await this.userService.signupTA(createDto);
  }

  /**
   * 註冊教授
   */
  @ApiOperation({ title: '註冊教授' })
  @Post('users/teacher')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async signupTeacher(@Body() createDto: CreateUserDto) {
    return await this.userService.signupTeacher(createDto);
  }

  @ApiOperation({ title: '查詢所有使用者', description: '可依照角色類別篩選' })
  @ApiImplicitQuery({
    name: 'roleID',
    description: '角色類別',
    required: false,
  })
  @Get('users')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findAll(@Query('roleID') roleID?: RoleType) {
    return await this.userService.findAll(roleID);
  }

  @ApiOperation({ title: '查詢使用者' })
  @Get('users/:id')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  /**
   * 更新角色
   */
  @ApiOperation({ title: '改變指定使用者角色' })
  @Put('users/:id/role')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff)
  async setRole(@Param('id') userID: string, @Body() changeDto: ChangeRoleDto) {
    return await this.userService.setRole(userID, changeDto.roleID);
  }

  /**
   * 刪除帳號
   */
  @ApiOperation({ title: '刪除使用者' })
  @Delete('users/:id')
  @ApiBearerAuth()
  @UseGuards(AuthenticatedGuard, RolesGuard)
  @Roles(RoleType.Staff)
  async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return SUCCESS;
  }

  /**
   * 忘記密碼
   */
  // @Post()
  async forgetPassword() {
    return await this.userService.forgetPassword();
  }
}
