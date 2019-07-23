import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  RelationId,
} from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Classroom } from './classroom.entity';

@Entity('schedule_change')
export class ScheduleChange {
  @PrimaryGeneratedColumn({ name: 'id' })
  private _id: number;

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  protected _classroom: Classroom;

  @RelationId((schg: ScheduleChange) => schg._classroom)
  protected _classroomID: string;

  @Column('date', { name: 'date' })
  private _date: Date;

  @Column({ name: 'sc_id' })
  private _period: string;

  @ManyToOne(type => SemesterCourse, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'sc_id' })
  private _semesterCourse: SemesterCourse;

  @RelationId((schg: ScheduleChange) => schg._semesterCourse)
  private _scID: string;

  @Column('int', { name: 'form_id', nullable: true })
  private _formID: string;

  @Column('tinyint', { name: 'type' })
  private _type: number;

  public get id() {
    return this._id;
  }

  /* XXX 邏輯上不需要，需要測試是否typeorm需要才能運作
  public set id(id: number) {
    this._id = id;
  }
   */

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

  public get period() {
    return this._period;
  }

  public set period(period: string) {
    this._period = period;
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

  public set scID(scID: string) {
    this._scID = scID;
  }

  public get formID() {
    return this._formID;
  }

  public set formID(formID: string) {
    this._formID = formID;
  }

  public get type() {
    return this._type;
  }

  public set type(type: number) {
    this._type = type;
  }
}
