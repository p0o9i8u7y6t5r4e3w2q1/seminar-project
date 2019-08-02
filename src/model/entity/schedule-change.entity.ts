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
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @ManyToOne(type => Classroom, { nullable: false })
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

  @ManyToOne(type => SemesterCourse, { nullable: true })
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
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    if (
      !DateUtil.isSameDate(this.date, date) ||
      this.classroomID !== classroomID
    ) {
      return null;
    }
    return [this.period];
  }

  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.scID = this.scID;
    result.formID = this.formID;

    switch (this.type) {
      case ScheduleChangeType.Added:
        // 1. scID == null and formID != null => from BookingForm
        if (this.scID == null) result.status = RoomStatus.Reserved;
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
