import { ScheduleResult } from './schedule-result';
import { Period } from '../../util';

export class ClassroomDateSchedule {
  private _classroomID: string;

  private _date: Date;

  /*
   * 類似 ScheudleResult[]
   * period <=> ScheduleResult
   */
  private _scheduleResults: { [x: string]: ScheduleResult } = {};

  constructor(classroomID: string, date: Date) {
    this._classroomID = classroomID;
    this._date = date;
  }

  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  public get date() {
    return this._date;
  }
  public set date(date: Date) {
    this._date = date;
  }

  public getScheduleResult(period: string): ScheduleResult {
    return this._scheduleResults[period];
  }

  public setScheduleResult(period: string, result: ScheduleResult): void {
    if (!Period.includes(period)) return; // or throw error
    this._scheduleResults[period] = result;
  }
}
