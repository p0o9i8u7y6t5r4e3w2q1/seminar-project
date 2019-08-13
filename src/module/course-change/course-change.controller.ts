import {
  UseGuards,
  Controller,
  Post,
  Put,
  Get,
  Delete,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { CourseChangeService } from './course-change.service';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { Roles, AuthenticatedGuard } from '../user';
import { RoleType } from '../../util';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('course change')
@Controller('course-change')
export class CourseChangeController {
  constructor(
    @Inject(CourseChangeService)
    private readonly ccService: CourseChangeService,
  ) {}

  /**
   * 補課申請
   */
  @Post('makeup')
  @UseGuards(AuthenticatedGuard)
  async createMakeupCourseForm(
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    return await this.ccService.createMakeupCourseForm(createFormDto);
  }

  /**
   * 查詢補課申請
   */
  @Get('find/:id')
  async findMakeupCourseForm(@Param('id') id: string) {
    return await this.ccService.findMakeupCourseForm(id);
  }

  /**
   * 確認補課申請
   */
  @Put('update/:id')
  @UseGuards(AuthenticatedGuard)
  @Roles(RoleType.Staff, RoleType.DeptHead)
  async checkMakeupCourse(formID: string, @Body() isApproved: boolean) {
    return await this.ccService.checkMakeupCourse(formID, isApproved);
  }

  /**
   * 停課
   */
  @Post('suspended')
  @UseGuards(AuthenticatedGuard)
  async suspendedCourse(@Body() suspendedCourseDto: SuspendedCourseDto) {
    return await this.ccService.suspendedCourse(suspendedCourseDto);
  }

  /**
   * 取得助教
   */
  @Get('course/:scID/TA')
  @UseGuards(AuthenticatedGuard)
  async getTAs(@Param('scID') scID: string) {
    return await this.ccService.getTAs(scID);
  }

  /**
   * 添加助教
   */
  @Put('course/:scID/addTA/:studID')
  @UseGuards(AuthenticatedGuard)
  async addTA(@Param('scID') scID: string, @Param('studID') studentID: string) {
    return await this.ccService.addTA(scID, studentID);
  }

  /**
   * 刪除助教
   */
  @Put('course/:scID/removeTA/:studID')
  @UseGuards(AuthenticatedGuard)
  async removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    return await this.ccService.removeTA(courseID, studentID);
  }
}
