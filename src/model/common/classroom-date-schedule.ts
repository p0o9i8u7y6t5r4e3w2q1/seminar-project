import { Expose } from 'class-transformer';
import { ScheduleResult } from './schedule-result';
import { Period, RoomOccupyStatus } from '../../util';

export class ClassroomDateSchedule {
  classroomID: string;

  date: Date;

  /*
   * 類似 ScheudleResult[]
   * period <=> ScheduleResult
   */
  @Expose({ name: 'results' })
  scheduleResults: { [x: string]: ScheduleResult } = {};

  constructor(init?: Partial<ClassroomDateSchedule>) {
    Object.assign(this, init);
  }

  public getScheduleResult(period: string): ScheduleResult {
    return this.scheduleResults[period];
  }

  public setScheduleResult(period: string, result: ScheduleResult): void {
    if (!Period.includes(period)) return; // or throw error
    this.scheduleResults[period] = result;
  }

  // 是否在指定節數，教室有非空的狀態
  public isConflict(periods: string[]) {
    for (const period of periods) {
      const result: ScheduleResult = this.scheduleResults[period];
      if (result && RoomOccupyStatus.includes(result.status)) {
        return true;
      }
    }
    return false;
  }
}
