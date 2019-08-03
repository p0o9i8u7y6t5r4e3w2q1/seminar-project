import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  DateUtil,
  FormPendingProgress,
  RoomOccupyStatus,
  RoomEmptyStatus,
  RoomStatus,
} from '../../util';
import {
  Schedule,
  ScheduleChange,
  BookingForm,
  MakeupCourseForm,
} from '../../model/entity';
import { RoomScheduleRepository } from '../../model/repository';
import {
  ClassroomDateSchedule,
  IRoomSchedule,
  ScheduleResult,
} from '../../model/common';

// XXX 尚未考慮學期因素
@Injectable()
export class ClassroomScheduleService {
  constructor(
    @InjectRepository(RoomScheduleRepository)
    private readonly rsRepository: RoomScheduleRepository,
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
    const scheduleResults: ScheduleResult[] = await this.fetchScheduleResults(
      classroomID,
      from,
      to,
      withPending,
    );

    this.merge(cdss, scheduleResults);
    return cdss;
  }

  // 假設 ScheduleResults[] 已經照優先順序排好:
  // Schedule > ScheduleChange > BookingForm = MakeupCourseForm
  private merge(cdss: ClassroomDateSchedule[], roomResults: ScheduleResult[]) {
    const startDate = cdss[0].date;
    for (const result of roomResults) {
      const idx = DateUtil.diffDays(startDate, result.date);
      const period = result.period;
      const oldResult = cdss[idx].getScheduleResult(period);
      if (
        oldResult != null &&
        this.isPriorResult(oldResult.status, result.status)
      ) {
        cdss[idx].setScheduleResult(period, result);
      }
    }
  }

  private isPriorResult(oldStatus: RoomStatus, newStatus: RoomStatus): boolean {
    switch (newStatus) {
      case RoomStatus.Pending:
        return RoomEmptyStatus.includes(oldStatus);
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

  private async fetchScheduleResults(
    classroomID: string,
    from: Date,
    to: Date,
    withPending: boolean,
  ): Promise<ScheduleResult[]> {
    const findParam = { classroomID, from, to };
    let promises: any[];
    let results: ScheduleResult[] = [];

    // combine promises to an array
    const schedPromise = this.rsRepository.findByClassroom(Schedule, findParam);
    const schgPromise = this.rsRepository.findByClassroom(
      ScheduleChange,
      findParam,
    );

    if (!withPending) {
      promises = [schedPromise, schgPromise];
    } else {
      const bfPromise = this.rsRepository.findPendingByClassroom(
        BookingForm,
        findParam,
      );
      const mcfPromise = this.rsRepository.findPendingByClassroom(
        MakeupCourseForm,
        findParam,
      );
      promises = [schedPromise, schgPromise, bfPromise, mcfPromise];
    }

    // add ScheduleResult[] of each IRoomSchedule  into return variable
    for (const promise of promises) {
      const roomSchedules: IRoomSchedule[] = await promise;
      for (const rs of roomSchedules) {
        results = results.concat(rs.getScheduleResults(from, to));
      }
    }

    return results;
  }
}
