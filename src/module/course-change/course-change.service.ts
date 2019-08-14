import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MakeupCourseForm, TA, SemesterCourse } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import { ScheduleChangeType } from '../../util';
import { ScheduleService, CreateScheduleChangeDto } from '../schedule';

@Injectable()
export class CourseChangeService {
  constructor(
    @InjectRepository(MakeupCourseForm)
    private readonly formRepository: Repository<MakeupCourseForm>,
    @InjectRepository(SemesterCourseRepository)
    private readonly scRepository: SemesterCourseRepository,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
  ) {}

  /**
   * 補課申請
   */
  public async createMakeupCourseForm(
    userID: string,
    createFormDto: CreateMakeupCourseFormDto,
  ) {
    const form: MakeupCourseForm = this.formRepository.create(createFormDto);
    this.formRepository.merge(form, { personID: userID });
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
  public async suspendedCourse(userID:string, suspendedCourseDto: SuspendedCourseDto) {
    const schgDto = CreateScheduleChangeDto.createByAny(suspendedCourseDto, {
      type: ScheduleChangeType.Deleted,
      personID: userID,
    });
    return await this.scheduleService.createScheduleChange(schgDto);
  }

  /**
   * 取得助教
   */
  public async getTAs(scID: string) {
    const sc = await this.scRepository.findOneOrFail(scID, {
      relations: ['TAs'],
    });
    return sc.TAs;
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
