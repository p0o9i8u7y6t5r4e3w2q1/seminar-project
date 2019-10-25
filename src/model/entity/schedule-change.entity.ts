import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Expose } from 'class-transformer';
import { Person } from './person.entity';
import { SemesterCourse } from './semester-course.entity';
import { Classroom } from './classroom.entity';
import { BookingForm } from './booking-form.entity';
import { DatePeriodRange } from '../common';
import {
  IRoomSchedule,
  ScheduleResult,
  CourseChangeHistory,
  ICourseChangeHistory,
} from '../common';
import {
  ScheduleChangeType,
  RoomStatus,
  DateUtil,
  Period,
  CourseChangeEvent,
} from '../../util';

@Entity('schedule_change')
export class ScheduleChange implements IRoomSchedule, ICourseChangeHistory {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(() => Classroom, { nullable: false })
  @JoinColumn({ name: 'room_id' })
  classroom: Classroom;

  @Column('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  @Column(() => DatePeriodRange, { prefix: false })
  timeRange: DatePeriodRange = new DatePeriodRange();

  @ManyToOne(() => SemesterCourse, { nullable: true })
  @JoinColumn({ name: 'sc_id' })
  semesterCourse: SemesterCourse;

  @Column('varchar', {
    name: 'person_id',
    nullable: true,
  })
  personID: string;

  @Expose({ name: 'applicant' })
  person?: Person;

  @Column('varchar', {
    length: 12,
    name: 'sc_id',
    nullable: true,
  })
  scID: string;

  @Column('char', {
    length: 8,
    name: 'form_id',
    nullable: true,
  })
  formID: string;

  @Column('tinyint', { name: 'type' })
  type: ScheduleChangeType;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  constructor(init?: Partial<ScheduleChange>) {
    Object.assign(this, init);
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
        scID: this.scID,
        formID: this.formID,
        classroomID: this.classroomID,
      });

      switch (this.type) {
        case ScheduleChangeType.Added:
          if (this.scID == null) {
            // 1. scID == null and formID != null => from BookingForm
            result.status = RoomStatus.Reserved;
            result.key = { id: this.formID, type: BookingForm };
          } else {
            // 2. scID != null and formID != null => from MakeupCourseForm
            result.status = RoomStatus.MakeupCourse;
            result.key = { id: this.scID, type: SemesterCourse };
          }
          break;
        case ScheduleChangeType.Deleted:
          // 1. scID != null and formID == null => from Suspended Coursee
          result.status = RoomStatus.SuspendedCourse;
          result.key = { id: this.scID, type: SemesterCourse };
          break;
      }
      results.push(result);
    }

    return results;
  }

  // 目前只有停課提供歷史資訊
  toCourseChangeHistory(): CourseChangeHistory {
    if (this.type === ScheduleChangeType.Deleted) {
      return new CourseChangeHistory({
        scID: this.scID,
        event: CourseChangeEvent.SUSPENDED,
        eventTime: this.createTime,
        detail: {
          classroomID: this.classroomID,
          timeRange: this.timeRange,
        },
      });
    }
    return null;
  }
}
