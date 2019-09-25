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
import {ClassroomDateSchedule} from '../../model/common';
import { CreateCardRecordDto } from './dto';
import { DateUtil, RoomEmptyStatus } from '../../util';
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
      const cardRecord = await this.recordRepository.create(
        createCardRecordDto,
      );
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
      return  this.recordToResponse(cardRecord);
    } catch (err) {
      console.log('fail to find card record');
    }
  }

  async recordToResponse(cardRecords:CardRecord[]){
    const cardResponses=plainToClass(RecordResponse,cardRecords);
    for (const cardResponse of cardResponses){
      cardResponse.cardOwner=(await this.findCardOwner(cardResponse.uid)).name;
    }
    return cardResponses;
}

  async findCardOwner(uid: string): Promise<Person | AlternateCard> {
    const altcard: AlternateCard = await this.altCardRepository.findOne(uid);
    return (altcard) ? altcard : await this.personRepository.findByUID(uid);
  }

  async checkAuthorization(
    uid: string,
    classroomID: string,
    time: Date,
  ): Promise<boolean> {
    try {
      // 1. 找出有著uid卡號的人
      const person = await this.personRepository.findByUID(uid);
      console.log(person);
      if (!person) return false;
      if (person instanceof Staff) {
        // 若是系辦人員，無條件開啟電源
        return true;
      }
      // 2. find ScheduleResult of this Date
      const dateResults: ClassroomDateSchedule[] = await this.roomScheduleService.fetchClassroomDateSchedules(
        classroomID,
        time,
        time,
        true,
      );

      const period: string = DateUtil.getPeriod(time);
      const result = dateResults[0].getScheduleResult(period);

      if (result == null) return false;
      else if (RoomEmptyStatus.includes(result.status)) return false;
      else await this.srRepository.loadKeyObject(result);
      console.log(result);
      console.log(dateResults);

      switch (result.key.type) {
        case BookingForm:
          const form: BookingForm = result.key.obj as BookingForm;
          return form.applicantID === person.id;
        case SemesterCourse:
          const sc: SemesterCourse = result.key.obj as SemesterCourse;
          if (person instanceof Teacher) {
            return sc.teacherID === person.id;
          } else {
            // person instance of Student
            return (
              sc.students.some((stud, index, array) => stud.id === person.id) ||
              sc.TAs.some((ta, index, array) => ta.id === person.id)
            );
          }
      }
    } catch (err) {
      console.log(err);
    }
  }

 
}
