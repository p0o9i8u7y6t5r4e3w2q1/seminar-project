import { Entity, Column, ManyToOne, JoinColumn, RelationId } from 'typeorm';
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
  @Column('varchar', {
    length: 32,
    name: 'person_id',
  })
  private _personID: string = null;

  @ManyToOne(type => Classroom, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'room_id' })
  protected _classroom: Classroom;

  @RelationId((form: MakeupCourseForm) => form._classroom)
  protected _classroomID: string;

  @ManyToOne(type => SemesterCourse, {
    nullable: false,
    onDelete: 'RESTRICT',
    onUpdate: 'RESTRICT',
  })
  @JoinColumn({ name: 'sc_id' })
  private _semesterCourse: SemesterCourse;

  @RelationId(
    (makeupCourseForm: MakeupCourseForm) => makeupCourseForm._semesterCourse,
  )
  private _scID: string;

  public get personID() {
    return this._personID;
  }

  public set personID(personID: string) {
    this._personID = personID;
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

  /**
   * @override 實做 IRoomStatus 函式
   */
  public getScheduleResult(): ScheduleResult {
    return null;
  }

  public check(isApproved: boolean) {
    this._progress = isApproved ? FormProgress.Approved : FormProgress.Rejected;
  }

  public updateClassroomDateSchedule(cds: ClassroomDateSchedule) {}
}
