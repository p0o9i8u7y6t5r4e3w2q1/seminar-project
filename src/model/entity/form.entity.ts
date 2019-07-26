import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Classroom } from './classroom.entity';
import { FormProgress, Period, DateUtil } from '../../util';
import { IRoomSchedule, ScheduleResult, DatePeriodRange } from '../common';

export abstract class Form implements IRoomSchedule {
  protected _id: number;

  protected _formID: string;

  protected _createTime: Date;

  protected _classroom: Classroom;

  protected _classroomID: string;

  // 不知是否設計適當
  protected _timeRange: DatePeriodRange = new DatePeriodRange();

  protected _progress: number = FormProgress.Pending;

  /* ---- setter and getter ---- */
  public get formID() {
    return this._formID;
  }

  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  public get id() {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  @CreateDateColumn({ name: 'create_time' })
  public get createTime() {
    return this._createTime;
  }
  public set createTime(createTime: Date) {
    this._createTime = createTime;
  }

  public get classroom() {
    return this._classroom;
  }
  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  @Column(type => DatePeriodRange, { prefix: false })
  public get timeRange() {
    return this._timeRange;
  }
  public set timeRange(timeRange: DatePeriodRange) {
    this._timeRange = timeRange;
  }

  @Column('tinyint', { name: 'progress' })
  public get progress() {
    return this._progress;
  }
  public set progress(progress: number) {
    this._progress = progress;
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    if (
      !DateUtil.isSameDate(this.timeRange.date, date) ||
      this._classroomID !== classroomID
    ) {
      return null;
    }

    const periods: string[] = [];
    const startIdx = Period.indexOf(this.timeRange.startPeriod);
    const endIdx = Period.indexOf(this.timeRange.endPeriod);
    for (let i = startIdx; i <= endIdx; i++) {
      periods.push(Period[i]);
    }
    return periods;
  }

  abstract getScheduleResult(): ScheduleResult;
}
