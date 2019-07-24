import { ScheduleResult } from './schedule-result';
/*
import {
  Form,
  Schedule,
  ScheduleChange,
  BookingForm,
  MakeupCourseForm,
} from '../entity';
 */
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

  public get ScheduleResults() {
    return this._scheduleResults;
  }
  // public set schedules(scheduleResults: ScheduleResult[]) {
  //   this._scheduleResults = scheduleResults;
  // }

  /*
  private setScheduleResults(
    period: string,
    data: Schedule | ScheduleChange | BookingForm | MakeupCourseForm,
  ) {
    if (this.scheduleResults[period] == null) {
      this.scheduleResults[period] = new ScheduleResult(data);
    } else {
      this.scheduleResults[period].resetSchedule(data);
    }
  }

  public mergeSchedule(sched: Schedule): void {
    if (sched.getWeekday() !== this.date.getDay()) return;
    this.setScheduleResults(sched.getPeriod(), sched);
  }

  public mergeScheduleChange(schg: ScheduleChange): void {
    if (schg.getDate() !== this.date) return;
    this.setScheduleResults(schg.getPeriod(), schg);
  }

  public mergeForm(form: Form): void {
    const timeRange = form.getTimeRange();
    if (timeRange.getDate() !== this.date) return;

    const startPeriod = timeRange.getStartPeriod();
    const endPeriod = timeRange.getEndPeriod();
    for (
      let p = Period.indexOf(startPeriod);
      p < Period.indexOf(endPeriod);
      p++
    ) {
      this.setScheduleResults(Period[p], form);
    }
  }
     */
}
