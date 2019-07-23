import { Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';
import { Classroom } from './classroom.entity';
import { DatePeriodRange } from '../common';
import { FormProgress } from '../../util';

export class Form {
  @PrimaryGeneratedColumn({ name: 'id' })
  protected _id: number;

  @CreateDateColumn({ name: 'create_time' })
  protected _createTime: Date;

  protected _classroom: Classroom;

  protected _classroomID: string;

  // 不知是否設計適當
  @Column(type => DatePeriodRange, { prefix: false })
  protected _timeRange: DatePeriodRange;

  @Column('tinyint', { name: 'progress' })
  protected _progress: number = FormProgress.Pending;

  public get id() {
    return this._id;
  }

  /* XXX 邏輯上不需要，需要測試是否typeorm需要才能運作
  public set id(id: number) {
    this._id = id;
  }
   */

  public get createTime() {
    return this._createTime;
  }

  /* XXX 邏輯上不需要，需要測試是否typeorm需要才能運作
  public set createTime(createTime: Date) {
    this._createTime = createTime;
  }
   */

  public get classroom() {
    return this._classroom;
  }

  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  public get classroomID() {
    return this._classroomID;
  }

  /* XXX not support by typeorm 但可以做一些測試
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }
   */

  public get timeRange() {
    return this._timeRange;
  }

  public set timeRange(timeRange: DatePeriodRange) {
    this._timeRange = timeRange;
  }

  public getProgress() {
    return this._progress;
  }

  /* XXX 邏輯上不需要，需要測試是否typeorm需要才能運作
  public setProgress(progress: number) {
    this._progress = progress;
  }
   */
}
