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
import { BookingForm } from './booking-form.entity';
import { IRoomSchedule, ScheduleResult } from '../common';
import { ScheduleChangeType, RoomStatus, DateUtil } from '../../util';

@Entity('schedule_change')
export class ScheduleChange implements IRoomSchedule {
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

  @Column('date', { name: 'date' })
  date: Date;

  @Column('char', { name: 'p_id' })
  period: string;

  @ManyToOne(() => SemesterCourse, { nullable: true })
  semesterCourse: SemesterCourse;

  @Column('varchar', { name: 'person_id' })
  personID: string;

  @Column('varchar', {
    length: 12,
    name: 'sc_id',
  })
  scID: string;

  @Column('char', { length: 8, name: 'form_id', nullable: true })
  formID: string;

  @Column('tinyint', { name: 'type' })
  type: ScheduleChangeType;

  @CreateDateColumn({ name: 'create_time' })
  createTime: Date;

  /* ---- implements IRoomSchedule functions ---- */
  public getScheduleResults(from: Date, to: Date): ScheduleResult[] {
    if (!DateUtil.isDateInRange(this.date, from, to)) return [];

    const result = new ScheduleResult({
      date: this.date,
      period: this.period,
      scID: this.scID,
      formID: this.formID,
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

    return [result];
  }
}
