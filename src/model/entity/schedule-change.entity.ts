import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Classroom } from './classroom.entity';

@Entity('schedule_change')
export class ScheduleChange {
  private _id: number;

  protected _classroom: Classroom;

  protected _classroomID: string;

  private _date: Date;

  private _period: string;

  private _semesterCourse: SemesterCourse;

  private _scID: string;

  private _formID: string;

  private _type: number;

  /* ---- setter and getter ---- */
  @PrimaryGeneratedColumn({ name: 'id' })
  public get id() {
    return this._id;
  }
  public set id(id: number) {
    this._id = id;
  }

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
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

  @Column({ name: 'sc_id' })
  public get period() {
    return this._period;
  }
  public set period(period: string) {
    this._period = period;
  }

  @ManyToOne(type => SemesterCourse, {
    nullable: true,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'sc_id' })
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

  @Column('int', { name: 'form_id', nullable: true })
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
}
