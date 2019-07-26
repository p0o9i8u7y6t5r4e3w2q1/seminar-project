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
import { CreateMakeupCourseFormDto } from './create-makeup-course-form.dto';
import { SuspendedCourseDto } from './suspended-course.dto';

@Controller('course-change')
export class CourseChangeController {
  constructor(
    @Inject(CourseChangeService)
    private readonly ccService: CourseChangeService,
  ) {}

  /**
   * 補課申請
   */
  @Post()
  createMakeupCourseForm(createFormDto: CreateMakeupCourseFormDto) {
    // TODO implement here
    this.ccService.createMakeupCourseForm(createFormDto);
  }

  /**
   * 查詢補課申請
   */
  @Get(':id')
  findMakeupCourseForm(id: string) {
    // TODO implement here
    this.ccService.findMakeupCourseForm(id);
  }

  /**
   * 確認補課申請
   */
  @Put()
  checkMakeupCourse(formID: string, isApproved: boolean) {
    // TODO implement here
    this.ccService.checkMakeupCourse(formID, isApproved);
  }

  /**
   * 停課
   */
  @Post()
  suspendedCourse(suspendedCourseDto: SuspendedCourseDto) {
    // TODO implement here
    this.ccService.suspendedCourse(suspendedCourseDto);
  }

  /**
   * 添加助教
   */
  @Put()
  addTA() {
    // TODO implement here
    this.ccService.addTA();
  }

  /**
   * 刪除助教
   */
  @Delete()
  removeTA() {
    // TODO implement here
    this.ccService.removeTA();
  }
}
