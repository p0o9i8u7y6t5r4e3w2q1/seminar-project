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
import { CreateUserDto, UpdateUserDto } from './dto';
import { UserService } from './user.service';
import { RoleType } from '../../util';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('user', 'test')
@Controller('test/user')
export class UserTestController {
  constructor(
    @Inject(UserService)
    private readonly userService: UserService,
  ) {}

  /* ------------------------------------------------ */
  /* test function */
  /* ------------------------------------------------ */
  @Get('find/:id')
  async findOne(id: string) {
    return await this.userService.findOne(id);
  }

  @Get('findAll')
  async findAll() {
    return await this.userService.findAll();
  }

  @Delete('delete/:id')
  async delete(@Param('id') id: string) {
    return await this.userService.delete(id);
  }

  @Put('update/:userID')
  async update(@Query('userID') userID: string, updateDto: UpdateUserDto) {
    return await this.userService.update(userID, updateDto);
  }

  @Put('changeRole/test')
  async setRoleTest(
    @Body('userID') userID: string,
    @Body('newRole') role: RoleType,
  ) {
    return await this.userService.setRole(userID, role);
  }
}
