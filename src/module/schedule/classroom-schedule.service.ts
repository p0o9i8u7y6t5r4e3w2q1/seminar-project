import { Injectable, OnModuleInit } from '@nestjs/common';
import { getCustomRepository } from 'typeorm';
import { DateUtil, RoomEmptyStatus, RoomStatus, Period } from '../../util';
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
export class ClassroomScheduleService implements OnModuleInit {
  private rsRepository: RoomScheduleRepository;

  onModuleInit() {
    // 自定義的repository目前只有這樣此方法可以運作
    this.rsRepository = getCustomRepository(RoomScheduleRepository);
  }

  /**
   * @param {boolean} withPending 決定要不要加上待審核狀態的訊息
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

  /**
   * 依學期課程id與時間範圍找出所有ScheduleResult
   * ScheduleChange會覆蓋Schedule的結果
   */
  public async fetchScheduleResultByScID(scID: string, from: Date, to: Date) {
    const param = { scID, from, to };
    const schedPromise = this.rsRepository.findBySemesterCourse(
      Schedule,
      param,
    );
    const schgPromise = this.rsRepository.findBySemesterCourse(
      ScheduleChange,
      param,
    );

    const schedResults = this.combineScheduleResults(
      await schedPromise,
      from,
      to,
    );
    const schgResults = this.combineScheduleResults(
      await schgPromise,
      from,
      to,
    );
    // 將schedResult 排序，後續schgResult比較方便覆蓋結果
    schedResults.sort((a, b) => {
      const diffDays = DateUtil.diffDays(a.date, b.date);
      if (diffDays !== 0) {
        return diffDays;
      } else {
        const diffPeriods = Period.indexOf(a.period) - Period.indexOf(b.period);
        if (diffPeriods !== 0) {
          return diffPeriods;
        } else return a.classroomID.localeCompare(b.classroomID);
      }
    });

    let i = 0;
    const len = schedResults.length;
    for (const schgResult of schgResults) {
      if (i >= len) break;

      if (schedResults[i].isConflict(schgResult)) schedResults[i] = schgResult;
      else i++;
    }
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
      let date: Date = from;
      !DateUtil.isSameDate(date, to);
      date = DateUtil.nextDay(date)
    ) {
      cds.push(new ClassroomDateSchedule({ classroomID, date }));
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
      results = results.concat(
        this.combineScheduleResults(roomSchedules, from, to),
      );
    }

    return results;
  }

  combineScheduleResults(
    roomSchedules: IRoomSchedule[],
    from,
    to,
  ): ScheduleResult[] {
    let results = [];
    for (const rs of roomSchedules) {
      results = results.concat(rs.getScheduleResults(from, to));
    }
    return results;
  }
}
