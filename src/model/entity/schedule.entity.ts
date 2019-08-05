import { Entity, PrimaryColumn, ManyToOne, Column, JoinColumn } from 'typeorm';
import { IRoomSchedule, ScheduleResult } from '../common';
import { Classroom } from './classroom.entity';
import { SemesterCourse } from './semester-course.entity';
import { RoomStatus, DateUtil } from '../../util';

@Entity('schedule')
export class Schedule implements IRoomSchedule {
  @PrimaryColumn('tinyint', { name: 'year' })
  year: number;

  @PrimaryColumn('tinyint', { name: 'semester' })
  semester: number;

  @PrimaryColumn('tinyint', { name: 'weekday' })
  weekday: number;

  // 節次
  @PrimaryColumn('char', { name: 'p_id' })
  period: string;

  @ManyToOne(() => Classroom, {
    primary: true,
    nullable: false,
  })
  @JoinColumn({ name: 'room_id' })
  classroom: Classroom;

  @PrimaryColumn('char', {
    length: 5,
    name: 'room_id',
  })
  classroomID: string;

  @ManyToOne(() => SemesterCourse, semesterCourse => semesterCourse.schedules, {
    nullable: false,
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'sc_id' })
  semesterCourse: SemesterCourse;

  @Column('varchar', {
    length: 12,
    name: 'sc_id',
  })
  scID: string;

  constructor(init?: Partial<Schedule>) {
    Object.assign(this, init);
  }

  /* ---- IRoomSchedule 實做 ---- */
  public getScheduleResults(from: Date, to: Date): ScheduleResult[] {
    const startWeekday = from.getDay();
    const diffDay = DateUtil.diffDays(from, to);
    const startIdx = (this.weekday - startWeekday + 7) % 7;
    const results: ScheduleResult[] = [];

    for (let i = startIdx; i < diffDay; i += 7) {
      const tmpDate = DateUtil.addDays(from, i);
      const result: ScheduleResult = new ScheduleResult({
        date: tmpDate,
        period: this.period,
        scID: this.scID,
        status: RoomStatus.NormalCourse,
      });

      result.key = { id: this.scID, type: SemesterCourse };
      results.push(result);
    }

    return results;
  }
}
