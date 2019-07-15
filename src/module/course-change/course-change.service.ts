import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakeupCourseForm } from '../../model/entity/makeup-course-form.entity';

@Injectable()
export class CourseChangeService {
  constructor(
    @InjectRepository(MakeupCourseForm)
    private readonly formRepository: Repository<MakepCourseForm>,
  ) {}

  /**
   * 補課申請
   */
  createMakeupCourseForm() {
    // TODO implement here
  }

  /**
   * 查詢補課申請
   */
  findMakeupCourseForm() {
    // TODO implement here
  }

  /**
   * 確認補課申請
   */
  checkMakeupCourse() {
    // TODO implement here
  }

  /**
   * 停課
   */
  cancelCourse() {
    // TODO implement here
  }

  /**
   * 添加助教
   */
  addTA() {
    // TODO implement here
  }

  /**
   * 刪除助教
   */
  removeTA() {
    // TODO implement here
  }
}
