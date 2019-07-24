import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Classroom } from './classroom.entity';
import { DatePeriodRange } from '../common';
import { FormProgress } from '../../util';

export class Form {
  protected _id: number;

  protected _createTime: Date;

  protected _classroom: Classroom;

  protected _classroomID: string;

  // 不知是否設計適當
  protected _timeRange: DatePeriodRange = new DatePeriodRange();

  protected _progress: number = FormProgress.Pending;

  /* ---- setter and getter ---- */
  @PrimaryGeneratedColumn({ name: 'id' })
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
}
