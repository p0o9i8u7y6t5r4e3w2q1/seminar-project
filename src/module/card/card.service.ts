import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import {
  CardRecord,
  Staff,
  SemesterCourse,
  BookingForm,
} from '../../model/entity';
import { ClassroomDateSchedule, ScheduleResult } from '../../model/common';
import { CreateCardRecordDto } from './dto';
import { DateUtil } from '../../util';
import { ClassroomScheduleService } from '../schedule/classroom-schedule.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardRecord)
    private readonly recordRepository: Repository<CardRecord>,
    @Inject(ClassroomScheduleService)
    private readonly roomScheduleService: ClassroomScheduleService,
    @InjectRepository(SemesterCourse)
    private readonly semesterCourseRepository: Repository<SemesterCourse>,
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
    @InjectRepository(BookingForm)
    private readonly bookingFormRepository: Repository<BookingForm>,
  ) {}

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
    // classroomID: string,
    date: Date,
    classroomDateSchedule: ClassroomDateSchedule,
  ): Promise<boolean> {
    try {
      const period: string = DateUtil.getPeriod(date);
      const scheduleResult: ScheduleResult = classroomDateSchedule.getScheduleResult(
        period,
      );

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
      return false;
    } catch (err) {
      console.log('fail to check authorization');
    }
  }
}
