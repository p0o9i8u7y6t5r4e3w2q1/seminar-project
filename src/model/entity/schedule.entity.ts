import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { IRoomSchedule, ScheduleResult } from '../common';
import { Classroom } from './classroom.entity';
import { SemesterCourse } from './semester-course.entity';
import { RoomStatus } from '../../util';

@Entity('schedule')
export class Schedule implements IRoomSchedule {
  private _weekday: number;

  /**
   * 節次
   */
  private _period: string;

  private _classroom: Classroom;

  private _classroomID: string;

  private _semesterCourse: SemesterCourse;

  private _scID: string;

  constructor(
    weekday: number,
    period: string,
    classroomID: string,
    scID: string,
  ) {
    this._weekday = weekday;
    this._period = period;
    this._classroomID = classroomID;
    this._scID = scID;
  }

  /* ---- setter and getter ---- */
  @PrimaryColumn('tinyint', { name: 'weekday' })
  public get weekday() {
    return this._weekday;
  }
  public set weekday(weekday: number) {
    this._weekday = weekday;
  }

  @PrimaryColumn('char', { name: 'p_id' })
  public get period() {
    return this._period;
  }
  public set period(period: string) {
    this._period = period;
  }

  @ManyToOne(type => Classroom, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  public get classroom() {
    return this._classroom;
  }
  public set classroom(classroom: Classroom) {
    this._classroom = classroom;
  }

  @PrimaryColumn('char', {
    length: 5,
    name: 'room_id',
  })
  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  @ManyToOne(
    type => SemesterCourse,
    semesterCourse => semesterCourse.schedules,
    {
      nullable: false,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn({ name: 'sc_id', referencedColumnName: 'id' })
  public get semesterCourse() {
    return this._semesterCourse;
  }
  public set semesterCourse(semesterCourse: SemesterCourse) {
    this._semesterCourse = semesterCourse;
  }

  @Column('char', {
    length: 9,
    name: 'sc_id',
  })
  public get scID() {
    return this._scID;
  }
  public set scID(scID: string) {
    this._scID = scID;
  }

  /* ---- IRoomSchedule 實做 ---- */
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    if (this._weekday !== date.getDay() || this.classroomID !== classroomID) {
      return null;
    }
    return [this._period];
  }

  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.scID = this.scID;
    result.status = RoomStatus.NormalCourse;

    return result;
  }
}
