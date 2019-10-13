import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { MakeupCourseForm, TA, SemesterCourse } from '../../model/entity';
import { SemesterCourseRepository } from '../../model/repository';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import {
  ScheduleChangeType,
  FormCheckedProgress,
  FormProgress,
} from '../../util';
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
    scID: string,
    createFormDto: CreateMakeupCourseFormDto,
  ) {
    const form: MakeupCourseForm = this.formRepository.create(createFormDto);
    console.log(createFormDto)
    this.formRepository.merge(form, { personID: userID, scID });
    console.log(form)
    return await this.formRepository.save(form);
  }

  /**
   * 查詢補課申請
   */
  public async findMakeupCourseForm(id: string) {
    return await this.formRepository.findOne(MakeupCourseForm.findID(id));
  }

  /**
   * 找出待審核的申請
   */
  async findPendingForm() {
    return await this.formRepository.find({
      progress: FormProgress.Pending,
    });
  }

  /**
   * 找出已審核的申請
   */
  async findCheckedForm() {
    return await this.formRepository.find({
      progress: In(FormCheckedProgress),
    });
  }

  /**
   * 確認補課申請
   */
  async checkMakeupCourse(formID: string, isApproved: boolean) {
    const form = await this.formRepository.findOne(
      MakeupCourseForm.findID(formID),
    );
    form.check(isApproved);
    await this.formRepository.save(form);

    if (form.progress === FormProgress.Approved) {
      const dto = CreateScheduleChangeDto.createByAny(form, {
        type: ScheduleChangeType.Added,
      });
      console.log(form)
      console.log(dto)
      return await this.scheduleService.createScheduleChange(dto);
    }

    return form;
  }

  /**
   * 停課
   */
  async suspendedCourse(
    userID: string,
    scID: string,
    suspendedCourseDto: SuspendedCourseDto,
  ) {
    const schgDto = CreateScheduleChangeDto.createByAny(suspendedCourseDto, {
      type: ScheduleChangeType.Deleted,
      personID: userID,
      scID,
    });

    return await this.scheduleService.createScheduleChange(schgDto);
  }

  /**
   * 取得助教
   */
  async getTAs(scID: string) {
    const sc = await this.scRepository.findOneOrFail(scID, {
      relations: ['TAs'],
    });
    return sc.TAs;
  }

  /**
   * 添加助教
   */
  async addTA(scID: string, studentID: string) {
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
  async removeTA(scID: string, studentID: string) {
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
