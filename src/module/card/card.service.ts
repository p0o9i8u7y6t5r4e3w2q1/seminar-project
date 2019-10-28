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
  SemesterCourse,
  BookingForm,
  Teacher,
  AlternateCard,
  Person,
} from '../../model/entity';
import { ClassroomDateSchedule } from '../../model/common';
import { CreateCardRecordDto } from './dto';
import { DateUtil, RoomEmptyStatus, Period } from '../../util';
import {
  ScheduleResultRepository,
  PersonRepository,
} from '../../model/repository';
import { ClassroomScheduleService } from '../schedule/classroom-schedule.service';
import { plainToClass } from 'class-transformer';
import { RecordResponse } from '../../model/common/record-response';

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
    try {
      console.log('save card record params');
      console.log(createCardRecordDto);
      const cardRecord = this.recordRepository.create(createCardRecordDto);
      return await this.recordRepository.save(cardRecord);
    } catch (err) {
      console.log('fail to save card record');
      return err;
    }
  }

  /**
   * 找出指定教室、時間範圍的刷卡記錄
   */
  async findRecord(
    classroomID: string,
    from: Date,
    to: Date,
  ): Promise<RecordResponse[]> {
    try {
      console.log('find card record params');
      console.log({ classroomID, from, to });
      const condition: any = { classroomID };

      const isFromValid: boolean = !isNaN(from.valueOf());
      const isToValid: boolean = !isNaN(to.valueOf());
      if (isFromValid && isToValid) {
        condition.recordTime = Between(from, to);
      } else if (isFromValid) {
        condition.recordTime = MoreThanOrEqual(from);
      } else if (isToValid) {
        condition.recordTime = LessThanOrEqual(to);
      }

      console.log(condition);
      const cardRecord = await this.recordRepository.find(condition);
      return this.recordToResponse(cardRecord);
    } catch (err) {
      console.log('fail to find card record');
    }
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

  async checkAuthorization(
    uid: string,
    classroomID: string,
    time: Date,
  ) {
    const response = {
      hasAuth: false,
      closeTime: undefined,
    };

    try {
      // 1. 找出有著uid卡號的人
      const person = await this.personRepository.findByUID(uid);
      console.log(person);
      if (!person) return response;
      if (person instanceof Staff) {
        // 若是系辦人員，無條件開啟電源
        response.hasAuth = true;
        return response;
      }
      // 2. find ScheduleResult of this Date
      const dateResults: ClassroomDateSchedule[] = await this.roomScheduleService.findClassroomDateSchedules(
        classroomID,
        time,
        time,
        true,
      );

      const period: string = DateUtil.getPeriod(time);
      const result = dateResults[0].getScheduleResult(period);

      if (result == null) return response;
      else if (RoomEmptyStatus.includes(result.status)) return response;
      else await this.srRepository.loadKeyObject(result);
      console.log(result);
      console.log(dateResults);

      switch (result.key.type) {
        case BookingForm:
          const form: BookingForm = result.key.obj as BookingForm;
          response.hasAuth = form.applicantID === person.id;
          return response;
        case SemesterCourse:
          const sc: SemesterCourse = result.key.obj as SemesterCourse;
          if (person instanceof Teacher) {
            response.hasAuth = sc.teacherID === person.id;
          } else {
            // person instance of Student
            response.hasAuth =
              sc.students.some((stud, index, array) => stud.id === person.id) ||
              sc.TAs.some((ta, index, array) => ta.id === person.id);
          }
      }
    } catch (err) {
      console.log(err);
    }
  }

  private addClosetime(
    nowPeriod: string,
    authRes: any,
    cds: ClassroomDateSchedule,
  ) {
    if (authRes.hasAuth === false) return authRes;

    const periodIdx = Period.indexOf(nowPeriod);
    const schedules = cds.scheduleResults;

    // let endPeriod =
    // for(let i = periodIdx + 1; i < Period.length; i++) {

    return null;
  }
}
