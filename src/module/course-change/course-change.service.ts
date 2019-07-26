import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakeupCourseForm } from '../../model/entity';
import { ScheduleService } from '../schedule/schedule.service';
import { CreateMakeupCourseFormDto } from './create-makeup-course-form.dto';
import { SuspendedCourseDto } from './suspended-course.dto';

@Injectable()
export class CourseChangeService {
  constructor(
    @InjectRepository(MakeupCourseForm)
    private readonly formRepository: Repository<MakeupCourseForm>,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
  ) {}

  /**
   * 補課申請
   */
  createMakeupCourseForm(createFormDto: CreateMakeupCourseFormDto) {
    // TODO implement here
    this.formRepository.create(createFormDto);
  }

  /**
   * 查詢補課申請
   */
  findMakeupCourseForm(id: string) {
    // TODO implement here
    return this.formRepository.findOne(id);
  }

  /**
   * 確認補課申請
   */
  async checkMakeupCourse(formID: string, isApproved: boolean) {
    // TODO implement here
    const form = await this.formRepository.findOne(formID);
    form.check(isApproved);
  }

  /*
   * 停課
   */
  suspendedCourse(suspendedCourseDto: SuspendedCourseDto) {
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
