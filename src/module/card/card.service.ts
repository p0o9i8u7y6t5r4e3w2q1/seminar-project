import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Repository,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
  getCustomRepository,
} from 'typeorm';
import {
  CardRecord,
  Staff,
  Student,
  TA,
  SemesterCourse,
  BookingForm,
  Teacher,
  AlternateCard,
  Person,
} from '../../model/entity';
import { ClassroomDateSchedule, ScheduleResult } from '../../model/common';
import { CreateCardRecordDto } from './dto';
import {
  DateUtil,
  RoomEmptyStatus,
  Period,
  PeriodObj,
  RoomOccupyStatus,
  SwipeCardResult,
} from '../../util';
import {
  ScheduleResultRepository,
  PersonRepository,
} from '../../model/repository';
import { ClassroomScheduleService } from '../schedule/classroom-schedule.service';
import { plainToClass } from 'class-transformer';
import { RecordResponse } from '../../model/common/record-response';

export interface AuthResponse {
  hasAuth: boolean;
  closeTime?: string;
}

@Injectable()
export class CardService implements OnModuleInit {
  private srRepository: ScheduleResultRepository;
  private personRepository: PersonRepository;

  constructor(
    @InjectRepository(AlternateCard)
    private readonly altCardRepository: Repository<AlternateCard>,
    @InjectRepository(CardRecord)
    private readonly recordRepository: Repository<CardRecord>,
    @Inject(ClassroomScheduleService)
    private readonly roomScheduleService: ClassroomScheduleService,
  ) {}

  onModuleInit() {
    this.srRepository = getCustomRepository(ScheduleResultRepository);
    this.personRepository = getCustomRepository(PersonRepository);
  }

  /**
   * 保存刷卡紀錄
   */
  async saveRecord(createCardRecordDto: CreateCardRecordDto) {
    const cardRecord = this.recordRepository.create(createCardRecordDto);
    console.log(cardRecord)
    return await this.recordRepository.save(cardRecord);
  }

  /**
   * 找出指定教室、時間範圍的刷卡記錄
   */
  async findRecord(
    classroomID: string,
    from: Date,
    to: Date,
  ): Promise<RecordResponse[]> {
    const condition: any = { classroomID };

    const isFromValid: boolean = !isNaN(from.valueOf());
    const isToValid: boolean = !isNaN(to.valueOf());
    if (isFromValid && isToValid) {
      condition.recordTime = Between(from, DateUtil.nextDay(to));
    } else if (isFromValid) {
      condition.recordTime = MoreThanOrEqual(from);
    } else if (isToValid) {
      condition.recordTime = LessThanOrEqual(DateUtil.nextDay(to));
    }

    const cardRecord = await this.recordRepository.find(condition);
    return this.recordToResponse(cardRecord);
  }

  async recordToResponse(cardRecords: CardRecord[]) {
    const cardResponses = plainToClass(RecordResponse, cardRecords);
    for (const cardResponse of cardResponses) {
      const owner: any = await this.findCardOwner(cardResponse.uid);
      cardResponse.cardOwner = owner;
    }
    return cardResponses;
  }

  async findCardOwner(uid: string): Promise<Person | AlternateCard> {
    const altcard: AlternateCard = await this.altCardRepository.findOne({
      uid,
    });
    return altcard ? altcard : await this.personRepository.findByUID(uid);
  }

  private findCloseTime(period: string, cds: ClassroomDateSchedule): Date {
    let lastPeriod = period;
    let tmpPeriod = PeriodObj[period].next;

    while (tmpPeriod) {
      const scheduleResult = cds.getScheduleResult(tmpPeriod);
      if (scheduleResult && RoomOccupyStatus.includes(scheduleResult.status)) {
        lastPeriod = tmpPeriod;
        tmpPeriod = PeriodObj[tmpPeriod].next;
      } else {
        break;
      }
    }

    return DateUtil.getTime(cds.date, lastPeriod, false);
  }

  async checkAuth(time: Date, classroomID, uid: string, turnOn: boolean) {
    const result: AuthResponse = { hasAuth: false };

    // 1. 找出有著uid卡號的人
    const person = await this.personRepository.findByUID(uid);

    // 2. 檢測使用者身分需不需要查schedule
    if (!person) return result;
    if (person instanceof Staff) {
      result.hasAuth = true;
      return result;
    }

    // 3. 呼叫function去取得schedule
    const cds = await this.findClassroomSchdules(classroomID, time);

    // 4. 根據開燈或關燈的不同取得schedule的結果
    let scheduleResult: ScheduleResult;
    const period = DateUtil.getPeriod(time);
    if (turnOn || time.getMinutes() > 10) {
      scheduleResult = cds.getScheduleResult(period);
    } else {
      scheduleResult = cds.getScheduleResult(PeriodObj[period].prev);
    }

    // 5. 若有schedule就取得相關物件，沒有就reject
    if (!scheduleResult) return result;
    else if (RoomEmptyStatus.includes(scheduleResult.status)) return result;
    else {
      const relations: string[] = [];
      if (person instanceof Student) relations.push('students', 'TAs');
      await this.srRepository.loadKeyObject(scheduleResult, relations);
    }

    // 6. 確認schedule權限
    switch (scheduleResult.key.type) {
      case BookingForm:
        const form: BookingForm = scheduleResult.key.obj as BookingForm;
        result.hasAuth = form.applicantID === person.id;
      case SemesterCourse:
        const sc: SemesterCourse = scheduleResult.key.obj as SemesterCourse;
        if (person instanceof Teacher) {
          result.hasAuth = sc.teacherID === person.id;
        } else {
          // person instance of Student
          result.hasAuth =
            sc.students.some((stud, index, array) => stud.id === person.id) ||
            sc.TAs.some((ta, index, array) => ta.id === person.id);
        }
    }

    // 7. 若是確認開燈權限就加入關燈的時間
    if (result.hasAuth && turnOn) {
      const closeTime = this.findCloseTime(period, cds);
      // 不知為何會轉出的時間string是用UTC的格式，因此要手動轉換
      result.closeTime = DateUtil.toDateString(closeTime, 'YYYY-MM-DDTHH:mm');
    }

    return result;
  }

  private async findClassroomSchdules(
    classroomID: string,
    date: Date,
  ): Promise<ClassroomDateSchedule> {
    // find schdule without pending status
    return (await this.roomScheduleService.findClassroomDateSchedules(
      classroomID,
      date,
      date,
      false,
    ))[0];
  }
}
