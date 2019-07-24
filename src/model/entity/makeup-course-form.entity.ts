import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Form } from './form.entity';
import { Classroom } from './classroom.entity';
import {
  IRoomSchedule,
  ClassroomDateSchedule,
  ScheduleResult,
} from '../common';
import { FormProgress } from '../../util';

@Entity('makeup_course_form')
export class MakeupCourseForm extends Form implements IRoomSchedule {
  private _personID: string = null;

  private _semesterCourse: SemesterCourse;

  private _scID: string;

  /* ---- setter and getter ---- */
  @Column('varchar', {
    length: 32,
    name: 'person_id',
  })
  public get personID() {
    return this._personID;
  }
  public set personID(personID: string) {
    this._personID = personID;
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

  @ManyToOne(type => SemesterCourse, {
    nullable: false,
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

  /* ---- other function ---- */
  public check(isApproved: boolean) {
    this._progress = isApproved ? FormProgress.Approved : FormProgress.Rejected;
  }

  /* ---- 實做 IRoomStatus 函式 ---- */
  public getScheduleResult(): ScheduleResult {
    return null;
  }

  public updateClassroomDateSchedule(cds: ClassroomDateSchedule) {}
}
