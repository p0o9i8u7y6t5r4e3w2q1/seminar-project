import {
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
  createMakeupCourseForm(@Body() createFormDto: CreateMakeupCourseFormDto) {
    return this.ccService.createMakeupCourseForm(createFormDto);
  }

  /**
   * 查詢補課申請
   */
  @Get('find/:id')
  findMakeupCourseForm(@Param('id') id: string) {
    return this.ccService.findMakeupCourseForm(id);
  }

  /**
   * 確認補課申請
   */
  @Put('update/:id')
  checkMakeupCourse(formID: string, @Body() isApproved: boolean) {
    return this.ccService.checkMakeupCourse(formID, isApproved);
  }

  /**
   * 停課
   */
  @Post('suspended')
  suspendedCourse(@Body() suspendedCourseDto: SuspendedCourseDto) {
    return this.ccService.suspendedCourse(suspendedCourseDto);
  }

  /**
   * 添加助教
   */
  @Put('course/:scID/addTA/:studID')
  addTA(@Param('scID') courseID: string, @Param('studID') studentID: string) {
    // TODO implement here
    this.ccService.addTA(courseID, studentID);
  }

  /**
   * 刪除助教
   */
  @Put('course/:scID/removeTA/:studID')
  removeTA(
    @Param('scID') courseID: string,
    @Param('studID') studentID: string,
  ) {
    this.ccService.removeTA(courseID, studentID);
  }
}
