import { ScheduleResult } from './schedule-result';
import { Period } from '../../util';

export class ClassroomDateSchedule {
  classroomID: string;

  date: Date;

  /*
   * 類似 ScheudleResult[]
   * period <=> ScheduleResult
   */
  private scheduleResults: { [x: string]: ScheduleResult } = {};

  constructor(classroomID: string, date: Date) {
    this.classroomID = classroomID;
    this.date = date;
  }

  public getScheduleResult(period: string): ScheduleResult {
    return this.scheduleResults[period];
  }

  public setScheduleResult(period: string, result: ScheduleResult): void {
    if (!Period.includes(period)) return; // or throw error
    this.scheduleResults[period] = result;
  }
}
