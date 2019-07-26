import { Injectable, Inject } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CardRecord } from '../../model/entity/card-record.entity';
import { ClassroomScheduleService } from '../schedule/classroom-schedule.service';

@Injectable()
export class CardService {
  constructor(
    @InjectRepository(CardRecord)
    private readonly recordRepository: Repository<CardRecord>,
    @Inject(ClassroomScheduleService)
    private readonly roomScheduleService: ClassroomScheduleService,
  ) {}

  /**
   * 保存刷卡紀錄
   */
  saveRecord() {
    // TODO implement here
    // this.recordRepository.insert();
  }

  /**
   * 找出指定教室、時間範圍的刷卡記錄
   */
  findRecord(classroomID: string, startDate: Date, endDate: Date) {
    // TODO implement here
  }

  /**
   * 檢查是否有開啟教室電源的權限
   * @param uid 卡片的識別號
   * @param classroomID 在哪一個教室刷卡
   */
  checkAuthorization(uid: string, classroomID: string) {
    // TODO implement here
    // 1. find ClassDateSchedule
    const now = new Date();
    const cds = this.roomScheduleService.fetchClassroomDateSchedules(
      classroomID,
      now,
      now,
      false,
    );
    // 2. find Person by card uid
    // 3. check person has Schedule Authorization
    //   a. Booking
    //   b. SemesterCourse
  }
}
