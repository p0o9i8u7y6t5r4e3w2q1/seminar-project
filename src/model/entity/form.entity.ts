import { Column, PrimaryGeneratedColumn, CreateDateColumn, BeforeInsert } from 'typeorm';
import { Classroom } from './classroom.entity';
import { FormProgress, Period, DateUtil } from '../../util';
import { Exclude } from 'class-transformer';
import { IRoomSchedule, ScheduleResult, DatePeriodRange } from '../common';

export abstract class Form implements IRoomSchedule {
  @PrimaryGeneratedColumn({ type: 'int', name: 'id' })
  @Exclude()
  id: number;

  formID: string;

  @Exclude()
  @Column('datetime', { name: 'create_time' })
  createTime: Date;

  @Exclude()
  classroom: Classroom;

  classroomID: string;

  // 不知是否設計適當
  @Column(() => DatePeriodRange, { prefix: false })
  timeRange: DatePeriodRange = new DatePeriodRange();

  @Column('tinyint', { name: 'progress' })
  progress: number = FormProgress.Pending;

  @BeforeInsert()
  public beforeInsert() {
    if (!this.createTime) {
      this.createTime = DateUtil.now();
    }
  }

  /* ---- implements IRoomSchedule functions ---- */
  public getRelatedPeriods(date: Date, classroomID: string): string[] {
    if (
      !DateUtil.isSameDate(this.timeRange.date, date) ||
      this.classroomID !== classroomID
    ) {
      return null;
    }

    const periods: string[] = [];
    const startIdx = Period.indexOf(this.timeRange.startPeriod);
    const endIdx = Period.indexOf(this.timeRange.endPeriod);
    for (let i = startIdx; i <= endIdx; i++) {
      periods.push(Period[i]);
    }
    return periods;
  }

  abstract getScheduleResults(from: Date, to: Date): ScheduleResult[];
}
