import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In, getCustomRepository } from 'typeorm';
import {
  MakeupCourseForm,
  TA,
  SemesterCourse,
  ScheduleChange,
  User,
} from '../../model/entity';
import { ICourseChangeHistory, CourseChangeHistory } from '../../model/common';
import { SemesterCourseRepository } from '../../model/repository';
import { CreateMakeupCourseFormDto, SuspendedCourseDto } from './dto';
import {
  ScheduleChangeType,
  FormCheckedProgress,
  FormProgress,
  DateUtil,
} from '../../util';
import { ScheduleService, CreateScheduleChangeDto } from '../schedule';
import {
  arrayToObject,
  uniqueArray,
  mapArrayToObjects,
  findEntityAndMapToObj,
  InformService,
} from '../shared';

@Injectable()
export class CourseChangeService {
  private pendingCount = 0;

  constructor(
    @InjectRepository(MakeupCourseForm)
    private readonly formRepository: Repository<MakeupCourseForm>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(SemesterCourseRepository)
    private readonly scRepository: SemesterCourseRepository,
    @Inject(ScheduleService)
    private readonly scheduleService: ScheduleService,
  ) {}

  public async findPendingFormsCount() {
    return await this.formRepository.count({
      progress: FormProgress.Pending,
    });
  }

  /**
   * 補課申請
   */
  public async createMakeupCourseForm(
    userID: string,
    scID: string,
    createFormDto: CreateMakeupCourseFormDto,
  ) {
    const form: MakeupCourseForm = this.formRepository.create(createFormDto);
    this.formRepository.merge(form, { personID: userID, scID });
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
    return await this.findFormByCondition({ progress: FormProgress.Pending });
  }

  /**
   * 找出已審核的申請
   */
  async findCheckedForm() {
    return await this.findFormByCondition({
      progress: In(FormCheckedProgress),
    });
  }

  async findFormByCondition(condition: any) {
    const forms: MakeupCourseForm[] = await this.formRepository.find({
      where: condition,
      relations: ['semesterCourse', 'semesterCourse.course'],
    });

    // 查詢跟form有關的person資料
    const persons = await this.userRepository.find({
      id: In(uniqueArray(forms, 'personID')),
    });
    // 將person資料放到form裡面
    mapArrayToObjects(persons, 'id', forms, 'personID', 'person');

    return forms;
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
    if (idx >= 0) semesterCourse.TAs.splice(idx, 1);
    // save
    return await this.scRepository.save(semesterCourse);
  }

  async findHistory(scID: string) {
    const objs: Array<ScheduleChange | MakeupCourseForm> = [];
    objs.push(
      ...(await this.scheduleService.findScheduleChange({
        scID,
        type: ScheduleChangeType.Deleted,
      })),
    );
    objs.push(...(await this.formRepository.find({ scID })));
    if (objs.length === 0) return objs;

    const history: CourseChangeHistory[] = objs.map(
      (item: ICourseChangeHistory) => item.toCourseChangeHistory(),
    );

    // 查詢跟history有關的person資料
    const persons = await this.userRepository.find({
      id: In(uniqueArray(history, 'personID')),
    });
    // 將person資料放到historys裡面
    mapArrayToObjects(persons, 'id', history, 'personID', 'person');

    return history.sort((a, b) => DateUtil.diff(a.eventTime, b.eventTime));
  }
}
