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
  @Column('varchar', {
    length: 9,
    name: 'person_id',
  })
  personID: string = null;

  @ManyToOne(type => SemesterCourse, { nullable: false })
  @JoinColumn({ name: 'sc_id' })
  semesterCourse: SemesterCourse;

  @Column('char', {
    length: 9,
    name: 'sc_id',
  })
  scID: string;

  /* ---- other function ---- */
  public check(isApproved: boolean) {
    this.progress = isApproved ? FormProgress.Approved : FormProgress.Rejected;
  }

  /* ---- listener in typeorm ---- */
  @AfterLoad()
  @AfterInsert()
  makeFormID() {
    this.formID = 'MF' + StringUtil.prefixZero(this.id, 6);
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.formID = this.formID;

    if (FormPendingProgress.includes(this.progress)) {
      result.status = RoomStatus.Pending;
    } else if (this.progress === FormProgress.Approved) {
      result.status = RoomStatus.MakeupCourse;
    }
    // else form is rejected, do nothing

    return result;
  }
}
