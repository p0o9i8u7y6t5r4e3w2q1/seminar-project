import {
  Controller,
  Get,
  Put,
  Delete,
  Inject,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, ChangeRoleDto } from './dto';
import { UserService } from './user.service';
import { RoleType } from '../../util';
import { ApiUseTags, ApiOperation } from '@nestjs/swagger';

@ApiUseTags('test')
@Controller('test/user')
export class UserTestController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  /* ------------------------------------------------ */
  /* test function */
  /* ------------------------------------------------ */
  @ApiOperation({ title: '查詢使用者' })
  @Get('find/:id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(id);
  }

  @ApiOperation({ title: '查詢所有使用者' })
  @Get('findAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @ApiOperation({ title: '刪除使用者' })
  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @ApiOperation({ title: '更新使用者資料' })
  @Put('update')
  async update(@Query('userID') userID: string, updateDto: UpdateUserDto) {
    return await this.userService.update(userID, updateDto);
  }

  @ApiOperation({ title: '改變使用者角色' })
  @Put('changeRole/:id')
  async setRoleTest(@Param('id') userID: string, @Body() changeDto: ChangeRoleDto) {
    return await this.userService.setRole(userID, changeDto.roleID);
  }
}
