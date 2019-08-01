import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { IRoomSchedule, ScheduleResult } from '../common';
import { Classroom } from './classroom.entity';
import { SemesterCourse } from './semester-course.entity';
import { RoomStatus } from '../../util';

@Entity('schedule')
export class Schedule implements IRoomSchedule {
  @PrimaryColumn('tinyint', { name: 'weekday' })
  weekday: number;

  // 節次
  @PrimaryColumn('char', { name: 'p_id' })
  period: string;

  @ManyToOne(type => Classroom, {
    primary: true,
    nullable: false,
  })
  @JoinColumn({ name: 'room_id', referencedColumnName: 'id' })
  classroom: Classroom;

  @PrimaryColumn('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  @ManyToOne(
    type => SemesterCourse,
    semesterCourse => semesterCourse.schedules,
    { nullable: false },
  )
  @JoinColumn({ name: 'sc_id', referencedColumnName: 'id' })
  semesterCourse: SemesterCourse;

  @Column('char', {
    length: 9,
    name: 'sc_id',
  })
  scID: string;

  constructor(
    weekday: number,
    period: string,
    classroomID: string,
    scID: string,
  ) {
    this.weekday = weekday;
    this.period = period;
    this.classroomID = classroomID;
    this.scID = scID;
  }

  /* ---- IRoomSchedule 實做 ---- */
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    if (this.weekday !== date.getDay() || this.classroomID !== classroomID) {
      return null;
    }
    return [this.period];
  }

  public getScheduleResult(): ScheduleResult {
    const result = new ScheduleResult();
    result.scID = this.scID;
    result.status = RoomStatus.NormalCourse;

    return result;
  }
}
