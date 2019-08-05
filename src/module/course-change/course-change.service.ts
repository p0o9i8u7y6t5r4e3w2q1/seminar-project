import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakeupCourseForm, TA, SemesterCourse } from '../../model/entity';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { ScheduleChangeType } from '../../util';
import { ScheduleService } from '../schedule/schedule.service';
import { CreateScheduleChangeDto } from '../schedule/dto/create-schedule-change.dto';

@Injectable()
export class CourseChangeService {
  constructor(
    @InjectRepository(MakeupCourseForm)
    private readonly formRepository: Repository<MakeupCourseForm>,
    @InjectRepository(SemesterCourse)
    private readonly scRepository: Repository<SemesterCourse>,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
  ) {}

  /**
   * 補課申請
   */
  public async createMakeupCourseForm(
    createFormDto: CreateMakeupCourseFormDto,
  ) {
    const form: MakeupCourseForm = this.formRepository.create(createFormDto);
    return await this.formRepository.save(form);
  }

  /**
   * 查詢補課申請
   */
  public async findMakeupCourseForm(id: string) {
    return await this.formRepository.findOne(MakeupCourseForm.findID(id));
  }

  /**
   * 確認補課申請
   */
  public async checkMakeupCourse(formID: string, isApproved: boolean) {
    const form = await this.formRepository.findOne(
      MakeupCourseForm.findID(formID),
    );
    form.check(isApproved);
    // TODO if pass then create schedule change
    return await this.formRepository.save(form);
  }

  /**
   * 停課
   */
  public async suspendedCourse(suspendedCourseDto: SuspendedCourseDto) {
    const schgDto = CreateScheduleChangeDto.createByAny(suspendedCourseDto, {
      type: ScheduleChangeType.Deleted,
    });
    return await this.scheduleService.createScheduleChange(schgDto);
  }

  /**
   * 添加助教
   */
  public async addTA(scID: string, studentID: string) {
    // TODO 加上一些防呆機制
    // find semester course from database
    const semesterCourse: SemesterCourse = await this.scRepository.findOneOrFail(
      scID,
      {
        relations: ['TAs'],
      },
    );
    // add ta
    semesterCourse.TAs.push({ id: studentID } as TA);
    // save
    return await this.scRepository.save(semesterCourse);
  }

  /**
   * 刪除助教
   */
  public async removeTA(scID: string, studentID: string) {
    // TODO 加上一些防呆機制
    const semesterCourse: SemesterCourse = await this.scRepository.findOneOrFail(
      scID,
      {
        relations: ['TAs'],
      },
    );
    // find index of ta in SemesterCourse.TAs
    const idx = semesterCourse.TAs.findIndex(ta => ta.id === studentID);
    // remove ta
    if (idx < -1) semesterCourse.TAs.splice(idx, 1);
    // save
    return await this.scRepository.save(semesterCourse);
  }
}
