import { Injectable, OnModuleInit } from '@nestjs/common';
import { getCustomRepository, In } from 'typeorm';
import {
  FormPendingProgress,
  DateUtil,
  RoomEmptyStatus,
  RoomStatus,
} from '../../util';
import {
  Schedule,
  ScheduleChange,
  BookingForm,
  MakeupCourseForm,
} from '../../model/entity';
import { ScheduleResultRepository } from '../../model/repository';
import { ClassroomDateSchedule, ScheduleResult } from '../../model/common';

// FIXME ScheduleResult只有 push方式可以正常合併
@Injectable()
export class ClassroomScheduleService implements OnModuleInit {
  private srRepository: ScheduleResultRepository;

  onModuleInit() {
    // 自定義的repository目前只有這樣此方法可以運作
    this.srRepository = getCustomRepository(ScheduleResultRepository);
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
    const schedPromise = this.srRepository.find(Schedule, from, to, { scID });
    const schgPromise = this.srRepository.find(ScheduleChange, from, to, {
      scID,
    });

    const schedResults = await schedPromise;
    const schgResults = await schgPromise;

    // schedule change覆蓋schedule結果
    const len = schedResults.length;
    for (const schgResult of schgResults) {
      for (let i = 0; i < len; i++) {
        if (schedResults[i].isConflict(schgResult)) {
          schedResults[i] = schgResult;
          break;
        } else {
          schedResults.push(schgResult);
        }
      }
    }
  }

  // 假設 ScheduleResults[] 已經照優先順序排好:
  // Schedule > ScheduleChange > BookingForm = MakeupCourseForm
  private merge(cdss: ClassroomDateSchedule[], roomResults: ScheduleResult[]) {
    const startDate: Date = cdss[0].date;
    for (const result of roomResults) {
      const idx = DateUtil.diffDays(startDate, result.date);
      const period = result.period;
      const oldResult = cdss[idx].getScheduleResult(period);
      if (
        oldResult == null ||
        this.isPriorStatus(oldResult.status, result.status)
      ) {
        cdss[idx].setScheduleResult(period, result);
      }
    }
  }

  private isPriorStatus(oldStatus: RoomStatus, newStatus: RoomStatus): boolean {
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
      DateUtil.diffDays(date, to) >= 0;
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
    const promises: Array<Promise<ScheduleResult[]>> = [];

    // combine promises to an array
    promises.push(this.srRepository.find(Schedule, from, to, { classroomID }));
    promises.push(
      this.srRepository.find(ScheduleChange, from, to, { classroomID }),
    );

    if (withPending) {
      const criteria = { classroomID, progress: In(FormPendingProgress) };
      promises.push(this.srRepository.find(BookingForm, from, to, criteria));
      promises.push(
        this.srRepository.find(MakeupCourseForm, from, to, criteria),
      );
    }

    // combine ScheduleResult[] together
    const results: ScheduleResult[] = [];
    for (const promise of promises) {
      const scheduleResults: ScheduleResult[] = await promise;
      results.push(...scheduleResults);
    }
    return results;
  }
}
