import { Injectable, Inject, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, getCustomRepository } from 'typeorm';
import {
  CardRecord,
  Staff,
  SemesterCourse,
  BookingForm,
  Teacher,
} from '../../model/entity';
import { ClassroomDateSchedule, ScheduleResult } from '../../model/common';
import { CreateCardRecordDto } from './dto';
import { DateUtil, RoomEmptyStatus } from '../../util';
import {
  ScheduleResultRepository,
  PersonRepository,
} from '../../model/repository';
import { ClassroomScheduleService } from '../schedule/classroom-schedule.service';

@Injectable()
export class CardService implements OnModuleInit {
  private srRepository: ScheduleResultRepository;
  private personRepository: PersonRepository;

  constructor(
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
  ): Promise<CardRecord[]> {
    try {
      console.log('find card record params');
      console.log({ classroomID, from, to });
      const cardRecord = await this.recordRepository.find({
        classroomID,
        recordTime: Between(from, to),
      });
      return cardRecord;
    } catch (err) {
      console.log('fail to find card record');
    }
  }

  async checkAuthorization(
    uid: string,
    classroomID: string,
    // date: Date,
    // classroomDateSchedule: ClassroomDateSchedule,
  ): Promise<boolean> {
    try {
      // 1. 找出有著uid卡號的人
      const person = await this.personRepository.findByUID(uid);
      if (person instanceof Staff) {
        // 若是系辦人員，無條件開啟電源
        return true;
      }
      // 2. find ScheduleResult of this Date
      const now = new Date();
      const dateResults: ClassroomDateSchedule[] = await this.roomScheduleService.fetchClassroomDateSchedules(
        classroomID,
        now,
        now,
        true,
      );

      const period: string = DateUtil.getPeriod(now);
      const result = dateResults[0].getScheduleResult(period);

      if (result == null) return false;
      else if (RoomEmptyStatus.includes(result.status)) return false;
      else this.srRepository.loadKeyObject(result);

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

      // switch (scheduleResult.status) {
      /*
        Empty = 0,
        SuspendedCourse = 1,
        NormalCourse = 2,
        MakeupCourse = 3,
        Reserved = 4,
        Pending = 5,<---what's this???
        */
      // 系辦也可以開電
      /*
        case 2 || 3:
          // search sc
          const semesterCourse = await this.semesterCourseRepository.find(
            scheduleResult.scID,
          );
          const studentsID = semesterCourse.map(function(item) {
            return item.id;
          });
          if (
            studentsID.includes(uid) ||
            semesterCourse.teacherID == uid ||
            this.staffRepository.find(uid)
          ) {
            return true;
          }
          break;
        case 4:
          // search form
          const bookingForm = await this.bookingFormRepository.find(
            scheduleResult.formID,
          );
          if (bookingForm.applicantID == uid || this.staffRepository.find(uid)) {
            return true;
          }
          break;
        default:
          return false;
      }
           */
    } catch (err) {
      console.log('fail to check authorization');
    }
  }
}
