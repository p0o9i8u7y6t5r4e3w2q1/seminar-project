import { Exclude, Expose, Transform } from 'class-transformer';
import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  AfterLoad,
  AfterInsert,
} from 'typeorm';
import { SemesterCourse } from './semester-course.entity';
import { Person } from './person.entity';
import { Form } from './form.entity';
import { ScheduleResult, CourseChangeHistory, ICourseChangeHistory } from '../common';
import {
  DateUtil,
  Period,
  StringUtil,
  FormProgress,
  FormPendingProgress,
  RoomStatus,
  CourseChangeEvent,
} from '../../util';

@Entity('makeup_course_form')
export class MakeupCourseForm extends Form implements ICourseChangeHistory {
  @Column('varchar', {
    length: 9,
    name: 'person_id',
  })
  @Exclude()
  personID: string;

  @Expose({ name: 'applicant' })
  person?: Person;

  @ManyToOne(() => SemesterCourse, { nullable: false })
  @JoinColumn({ name: 'sc_id' })
  @Transform(sc => (sc && sc.course ? sc.course.name : undefined))
  @Expose({ name: 'course' })
  semesterCourse: SemesterCourse;

  @Column('varchar', {
    length: 12,
    name: 'sc_id',
  })
  scID: string;

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  constructor(init?: Partial<MakeupCourseForm>) {
    super();
    Object.assign(this, init);
  }

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

  /**
   * @return number form real id
   */
  static findID(formID: string): number {
    // TODO need more validation
    return Number(formID.slice(2));
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResults(from: Date, to: Date): ScheduleResult[] {
    if (!DateUtil.isDateInRange(this.timeRange.date, from, to)) return [];

    const startIdx = Period.indexOf(this.timeRange.startPeriod);
    const endIdx = Period.indexOf(this.timeRange.endPeriod);
    const results: ScheduleResult[] = [];
    for (let i = startIdx; i <= endIdx; i++) {
      const result = new ScheduleResult({
        date: this.timeRange.date,
        period: Period[i],
        formID: this.formID,
        classroomID: this.classroomID,
        key: { id: this.formID, type: MakeupCourseForm },
      });

      if (FormPendingProgress.includes(this.progress)) {
        result.status = RoomStatus.Pending;
      } else if (this.progress === FormProgress.Approved) {
        result.status = RoomStatus.Reserved;
      }
      // else form is rejected, do nothing

      results.push(result);
    }

    return results;
  }

  /* ---- implements ICourseChangeHistory functions ---- */
  public toCourseChangeHistory(): CourseChangeHistory {
    return new CourseChangeHistory({
      scID: this.scID,
      personID: this.personID,
      eventTime: this.createTime,
      event: CourseChangeEvent.MAKEUP,
      detail: {
        formID: this.formID,
        classroomID: this.classroomID,
        timeRange: this.timeRange,
        progress: this.progress,
      },
    });
  }
}
