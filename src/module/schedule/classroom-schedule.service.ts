import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between, In } from 'typeorm';
import {
  DateUtil,
  FormPendingProgress,
  RoomOccupyStatus,
  RoomStatus,
} from '../../util';
import {
  Schedule,
  ScheduleChange,
  BookingForm,
  MakeupCourseForm,
} from '../../model/entity';
import {
  ClassroomDateSchedule,
  IRoomSchedule,
  ScheduleResult,
} from '../../model/common';

@Injectable()
export class ClassroomScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedRepository: Repository<Schedule>,
    @InjectRepository(ScheduleChange)
    private readonly schgRepository: Repository<ScheduleChange>,
    @InjectRepository(BookingForm)
    private readonly bFormRepository: Repository<BookingForm>,
    @InjectRepository(MakeupCourseForm)
    private readonly mcFormRepository: Repository<MakeupCourseForm>,
  ) {}

  /**
   * @param withPending 決定要不要加上待審核狀態的訊息
   * 加上待審核狀態，速度可能會比較慢，需要的從資料庫讀取比較多資料
   */
  async fetchClassroomDateSchedules(
    classroomID: string,
    from: Date,
    to: Date,
    withPending: boolean,
  ): Promise<ClassroomDateSchedule[]> {
    const cdss = this.initClassroomDateSchedules(classroomID, from, to);
    const roomSchedules: IRoomSchedule[] = await this.fetchRoomSchedules(
      classroomID,
      from,
      to,
      withPending,
    );

    roomSchedules.forEach(roomSchedule => {
      cdss.forEach(cds => {
        this.merge(cds, roomSchedule);
      });
    });

    return cdss;
  }

  private merge(cds: ClassroomDateSchedule, roomSchedule: IRoomSchedule) {
    const periods = roomSchedule.getRelatedPeriods(cds.date, cds.classroomID);

    if (periods == null) return;
    periods.forEach(period => {
      const oldResult = cds.getScheduleResult(period);
      const newResult = roomSchedule.getScheduleResult();

      if (this.isPriorResult(oldResult, newResult)) {
        cds.setScheduleResult(period, newResult);
      }
    });
  }

  private isPriorResult(
    oldResult: ScheduleResult,
    newResult: ScheduleResult,
  ): boolean {
    if (oldResult == null) return true;
    if (newResult == null) return false;

    switch (newResult.status) {
      case RoomStatus.Pending:
        return RoomOccupyStatus.includes(oldResult.status);
    }
    return true;
  }

  private initClassroomDateSchedules(
    classroomID: string,
    from: Date,
    to: Date,
  ): ClassroomDateSchedule[] {
    const cds: ClassroomDateSchedule[] = [];
    for (
      let d: Date = from;
      !DateUtil.isSameDate(d, to);
      d = DateUtil.nextDay(d)
    ) {
      cds.push(new ClassroomDateSchedule(classroomID, d));
    }
    return cds;
  }

  // fetch data from database
  private async fetchRoomSchedules(
    classroomID: string,
    from: Date,
    to: Date,
    withPending: boolean,
  ): Promise<IRoomSchedule[]> {
    let schedsPromise = null;
    let schgsPromise = null;
    let bFormsPromise = null;
    let mcFormsPromise = null;
    // 1-a. find Schedule
    schedsPromise = this.schedRepository.find({
      classroomID,
      weekday: In(DateUtil.getWeekdays(from, to)),
    });
    // 1-b. find ScheduleChange
    schgsPromise = this.schgRepository.find({
      classroomID,
      date: Between(from, to),
    });

    if (withPending) {
      // 1-c. find BookingForm
      bFormsPromise = this.bFormRepository.find({
        classroomID,
        timeRange: {
          date: Between(from, to),
        },
        progress: In(FormPendingProgress),
      });

      // 1-d. find MakeupCourseForm
      mcFormsPromise = this.mcFormRepository.find({
        classroomID,
        timeRange: {
          date: Between(from, to),
        },
        progress: In(FormPendingProgress),
      });
    }

    const roomSchedules: IRoomSchedule[] = [];
    roomSchedules.concat(await schedsPromise);
    roomSchedules.concat(await schgsPromise);
    roomSchedules.concat(await bFormsPromise);
    roomSchedules.concat(await mcFormsPromise);

    return roomSchedules;
  }
}
