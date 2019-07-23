import {
  Entity,
  PrimaryColumn,
  ManyToOne,
  RelationId,
  JoinColumn,
} from 'typeorm';
import {
  IRoomSchedule,
  ScheduleResult,
  ClassroomDateSchedule,
} from '../common';
import { Classroom } from './classroom.entity';
import { SemesterCourse } from './semester-course.entity';
import { RoomStatus, DateUtil } from '../../util';

@Entity('schedule')
export class Schedule implements IRoomSchedule {
  @PrimaryColumn('tinyint', { name: 'weekday' })
  private _weekday: number;

  /**
   * 節次
   */
  @PrimaryColumn('char', { name: 'p_id' })
  private _period: string;

  @ManyToOne(type => Classroom, {
    primary: true,
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  private _classroom: Classroom;

  @RelationId((schedule: Schedule) => schedule._classroom)
  private _classroomID: string;

  @ManyToOne(
    type => SemesterCourse,
    semesterCourse => semesterCourse.schedules,
    {
      nullable: false,
      onDelete: 'RESTRICT',
      onUpdate: 'RESTRICT',
    },
  )
  @JoinColumn({ name: 'sc_id' })
  private _semesterCourse: SemesterCourse;

  @RelationId((schedule: Schedule) => schedule._semesterCourse)
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

  public get weekday() {
    return this._weekday;
  }

  public set weekday(weekday: number) {
    this._weekday = weekday;
  }

  public get period() {
    return this._period;
  }

  public set period(period: string) {
    this._period = period;
  }

  public get classroomID() {
    return this._classroomID;
  }

  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  public get semesterCourse() {
    return this._semesterCourse;
  }

  public set semesterCourse(semesterCourse: SemesterCourse) {
    this._semesterCourse = semesterCourse;
  }

  public get scID() {
    return this._scID;
  }

  /* XXX not support by typeorm 但可以做一些測試
  public set scID(scID: string) {
    this._scID = scID;
  }
   */

  public updateClassroomDateSchedule(cds: ClassroomDateSchedule): void {
    // TODO
  }

  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.scID = this.scID;
    result.status = RoomStatus.NormalCourse;

    return result;
  }
}
