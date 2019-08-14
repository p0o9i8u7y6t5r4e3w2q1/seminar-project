import {
  Controller,
  Post,
  Put,
  Get,
  Query,
  Param,
  Body,
  Inject,
} from '@nestjs/common';
import { CourseChangeService } from './course-change.service';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { ApiUseTags } from '@nestjs/swagger';

@ApiUseTags('course change', 'test')
@Controller('test/course-change')
export class CourseChangeTestController {
  constructor(
    @Inject(CourseChangeService)
    private readonly ccService: CourseChangeService,
  ) {}

  /**
   * 補課申請
   */
  @Post('makeup')
  async createMakeupCourseForm(
    @Query('userID') userID: string,
    @Body() createFormDto: CreateMakeupCourseFormDto,
  ) {
    return await this.ccService.createMakeupCourseForm(userID, createFormDto);
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
  async checkMakeupCourse(formID: string, @Body() isApproved: boolean) {
    return await this.ccService.checkMakeupCourse(formID, isApproved);
  }

  /**
   * 停課
   */
  @Post('suspended')
  async suspendedCourse(
    @Query('userID') userID: string,
    @Body() suspendedCourseDto: SuspendedCourseDto,
  ) {
    return this.ccService.suspendedCourse(userID, suspendedCourseDto);
  }

  /**
   * 取得助教
   */
  @Get('course/:scID/TA')
  async getTAs(@Param('scID') scID: string) {
    return await this.ccService.getTAs(scID);
  }

  /**
   * 添加助教
   */
  @Put('course/:scID/addTA/:studID')
  async addTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    return await this.ccService.addTA(courseID, studentID);
  }

  /**
   * 刪除助教
   */
  @Put('course/:scID/removeTA/:studID')
  async removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    this.ccService.removeTA(courseID, studentID);
  }
}
