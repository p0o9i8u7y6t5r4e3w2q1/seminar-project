import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Classroom } from './classroom.entity';
import { IRoomSchedule, ScheduleResult } from '../common';
import { ScheduleChangeType, RoomStatus, DateUtil } from '../../util';

@Entity('schedule_change')
export class ScheduleChange implements IRoomSchedule {
  private _id: number;

  protected _classroom: Classroom;

  protected _classroomID: string;

  private _date: Date;

  private _period: string;

  private _semesterCourse: SemesterCourse;

  private _personID: string;

  private _scID: string;

  private _formID: string;

  private _type: ScheduleChangeType;

  private _createTime: Date;

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

  @ManyToOne(type => Classroom, {
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

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  public get classroomID() {
    return this._classroomID;
  }
  public set classroomID(classroomID: string) {
    this._classroomID = classroomID;
  }

  @Column('date', { name: 'date' })
  public get date() {
    return this._date;
  }
  public set date(date: Date) {
    this._date = date;
  }

  @Column('char', { name: 'p_id' })
  public get period() {
    return this._period;
  }
  public set period(period: string) {
    this._period = period;
  }

  @Column('varchar', { name: 'person_id' })
  public get personID() {
    return this._personID;
  }
  public set personID(personID: string) {
    this._personID = personID;
  }

  @ManyToOne(type => SemesterCourse, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
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

  @Column('char', { length: 8, name: 'form_id', nullable: true })
  public get formID() {
    return this._formID;
  }
  public set formID(formID: string) {
    this._formID = formID;
  }

  @Column('tinyint', { name: 'type' })
  public get type() {
    return this._type;
  }
  public set type(type: number) {
    this._type = type;
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    if (
      !DateUtil.isSameDate(this._date, date) ||
      this._classroomID !== classroomID
    ) {
      return null;
    }
    return [this._period];
  }

  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.scID = this._scID;
    result.formID = this._formID;

    switch (this._type) {
      case ScheduleChangeType.Added:
        // 1. scID == null and formID != null => from BookingForm
        if (this._scID == null) result.status = RoomStatus.Reserved;
        // 2. scID != null and formID != null => from MakeupCourseForm
        else result.status = RoomStatus.MakeupCourse;
        break;
      case ScheduleChangeType.Deleted:
        // 1. scID != null and formID == null => from Suspended Coursee
        result.status = RoomStatus.SuspendedCourse;
        break;
    }
    return result;
  }
}
