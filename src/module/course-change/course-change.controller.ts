import { Controller, Post, Put, Get, Delete, Param } from '@nestjs/common';
import { CourseChangeService } from './course-change.service';

@Controller('course-change')
export class CourseChangeController {
  constructor(private readonly ccService: CourseChangeService) {}

  /**
   * 補課申請
   */
  @Post()
  createMakeupCourseForm() {
    // TODO implement here
    this.ccService.createMakeupCourseForm();
  }

  /**
   * 查詢補課申請
   */
  @Get()
  findMakeupCourseForm() {
    // TODO implement here
    this.ccService.findMakeupCourseForm();
  }

  /**
   * 確認補課申請
   */
  @Put()
  checkMakeupCourse() {
    // TODO implement here
    this.ccService.checkMakeupCourse();
  }

  /**
   * 停課
   */
  @Post()
  cancelCourse() {
    // TODO implement here
    this.ccService.cancelCourse();
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
    this.ccService.checkMakeupCourse();
  }
}
