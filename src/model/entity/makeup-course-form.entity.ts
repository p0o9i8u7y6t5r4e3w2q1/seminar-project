import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Form } from './form.entity';
import { Classroom } from './classroom.entity';
import { IRoomSchedule, ScheduleResult } from '../common';
import {
  StringUtil,
  FormProgress,
  FormPendingProgress,
  RoomStatus,
} from '../../util';

@Entity('makeup_course_form')
export class MakeupCourseForm extends Form implements IRoomSchedule {
  private _personID: string = null;

  private _semesterCourse: SemesterCourse;

  private _scID: string;

  /* ---- setter and getter ---- */
  @Column('varchar', {
    length: 9,
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

  @ManyToOne(type => SemesterCourse, {
    nullable: false,
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

  /* ---- other function ---- */
  public check(isApproved: boolean) {
    this._progress = isApproved ? FormProgress.Approved : FormProgress.Rejected;
  }

  /* ---- listener in typeorm ---- */
  @AfterLoad()
  @AfterInsert()
  makeFormID() {
    this._formID = 'MF' + StringUtil.prefixZero(this._id, 6);
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.formID = this._formID;

    if (FormPendingProgress.includes(this.progress)) {
      result.status = RoomStatus.Pending;
    } else if (this.progress === FormProgress.Approved) {
      result.status = RoomStatus.MakeupCourse;
    }
    // else form is rejected, do nothing

    return result;
  }
}
