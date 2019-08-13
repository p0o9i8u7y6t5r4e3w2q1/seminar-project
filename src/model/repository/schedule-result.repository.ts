import { EntityRepository, EntityManager, Between, In } from 'typeorm';
import { SemesterRepository } from './semester.repository';
import { IRoomSchedule, ScheduleResult } from '../common';
import {
  MakeupCourseForm,
  BookingForm,
  Schedule,
  ScheduleChange,
  SemesterCourse,
} from '../entity';
import { DateUtil } from '../../util';

// FIXME ScheduleResult只有 push方式可以正常合併
@EntityRepository()
export class ScheduleResultRepository {
  private semRepository: SemesterRepository;
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.semRepository = manager.getCustomRepository(SemesterRepository);
  }

  async loadKeyObject(data: ScheduleResult | ScheduleResult[]): Promise<void> {
    if (Array.isArray(data)) {
      for (const e of data) {
        this.loadKeyObject(e);
      }
    } else {
      if (!data.key) return;
      if (!data.key.id || !data.key.type) return;
      data.key.obj = await this.findObject(data.key.id, data.key.type);
    }
  }

  private findObject(id: string, type: any): Promise<any> {
    switch (type) {
      case MakeupCourseForm:
        return this.manager.findOne(
          MakeupCourseForm,
          MakeupCourseForm.findID(id),
        );
      case BookingForm:
        return this.manager.findOne(BookingForm, BookingForm.findID(id));
      case SemesterCourse:
        return this.manager.findOne(SemesterCourse, id, {
          relations: ['TAs', 'teacher', 'students'],
        });
    }
  }

  public async find(
    type: any,
    from: Date,
    to: Date,
    criteria: any,
  ): Promise<ScheduleResult[]> {
    let results: ScheduleResult[] = [];
    switch (type) {
      case Schedule:
        const schedRanges: any[] = await this.semRepository.findSchedules(
          from,
          to,
          {
            ...criteria,
            weekday: In(DateUtil.getWeekdays(from, to)),
          },
        );
        for (const schedRange of schedRanges) {
          results.push(
            ...this.toScheduleResults(
              schedRange.schedules,
              schedRange.from,
              schedRange.to,
            ),
          );
        }
        break;
      case ScheduleChange:
        const schgs: ScheduleChange[] = await this.manager.find(
          ScheduleChange,
          {
            ...criteria,
            timeRange: { date: Between(from, to) },
          },
        );
        results = this.toScheduleResults(schgs, from, to);
        break;
      case BookingForm:
        const bfs: BookingForm[] = await this.manager.find(BookingForm, {
          ...criteria,
          timeRange: { date: Between(from, to) },
        });
        results = this.toScheduleResults(bfs, from, to);
        break;
      case MakeupCourseForm:
        const mcfs: MakeupCourseForm[] = await this.manager.find(
          MakeupCourseForm,
          {
            ...criteria,
            timeRange: { date: Between(from, to) },
          },
        );
        results = this.toScheduleResults(mcfs, from, to);
        break;
    }
    return results;
  }

  private toScheduleResults(
    roomSchedules: IRoomSchedule[],
    from: Date,
    to: Date,
  ): ScheduleResult[] {
    const results: ScheduleResult[] = [];
    for (const rs of roomSchedules) {
      const tmpResults: ScheduleResult[] = (rs as IRoomSchedule).getScheduleResults(from, to);
      console.log(tmpResults);
      results.push(...tmpResults);
    }
    return results;
  }
}
