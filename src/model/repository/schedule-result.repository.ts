import { EntityRepository, EntityManager, Between, In } from 'typeorm';
import { SemesterRepository } from './semester.repository';
import { IRoomSchedule, ScheduleResult, DatePeriodRange } from '../common';
import {
  MakeupCourseForm,
  BookingForm,
  Schedule,
  ScheduleChange,
  SemesterCourse,
} from '../entity';
import { DateUtil, ScheduleUtil } from '../../util';
import {
  mapToArrayObject,
  uniqueArrayFn,
  mapArrayToObjectsFn,
} from '../../module/shared';

/**
 * FIXME ScheduleResult只有 push方式可以正常合併
 */
@EntityRepository()
export class ScheduleResultRepository {
  private semRepository: SemesterRepository;
  private manager: EntityManager;

  constructor(manager: EntityManager) {
    this.manager = manager;
    this.semRepository = manager.getCustomRepository(SemesterRepository);
  }

  async loadKeyObject(
    data: ScheduleResult | ScheduleResult[],
    relations?: string[],
  ): Promise<void> {
    if (Array.isArray(data)) {
      if (data.length === 0) return;
      // use class type category objects
      const arrObj = mapToArrayObject(data, item => item.key.type.name);
      const promises: Array<Promise<any>> = [];
      for (const key of Object.keys(arrObj)) {
        // map each object array to id array
        const idArr = uniqueArrayFn(arrObj[key], obj => obj.key.id);
        promises.push(this.findObject(idArr, key, relations));
      }

      for (const promise of promises) {
        const resultArr = await promise;
        mapArrayToObjectsFn(
          resultArr,
          entity => entity.id,
          data,
          sr => sr.key.id,
          (entity, sr) => (sr.key.obj = entity),
        );
      }
    } else {
      if (!data.key) return;
      if (!data.key.id || !data.key.type) return;
      data.key.obj = await this.findObject(
        data.key.id,
        data.key.type,
        relations,
      );
    }
  }

  private findObject(
    idData: string | string[],
    type: any | string,
    relations?: string[],
  ): Promise<any> {
    switch (type) {
      case MakeupCourseForm:
      case MakeupCourseForm.name:
        return this.rawfindObject(
          idData,
          MakeupCourseForm,
          id => MakeupCourseForm.findID(id),
          relations,
        );
      case BookingForm:
      case BookingForm.name:
        return this.rawfindObject(
          idData,
          BookingForm,
          id => BookingForm.findID(id),
          relations,
        );
      case SemesterCourse:
      case SemesterCourse.name:
        return this.rawfindObject(idData, SemesterCourse, id => id, relations);
    }
  }

  private rawfindObject(
    data: any,
    type: any,
    mapFn: (item) => any,
    relations?: any,
  ) {
    if (Array.isArray(data)) {
      return this.manager.find(type, {
        where: { id: In(data.map(mapFn)) },
        relations,
      });
    } else {
      return this.manager.findOne(type, {
        where: { id: mapFn(data) },
        relations,
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
          const partResults = this.toScheduleResults(
            schedRange.schedules,
            schedRange.from,
            schedRange.to,
          );

          results.push(...partResults);
        }
        break;
      case ScheduleChange:
      case BookingForm:
      case MakeupCourseForm:
        const datas: any[] = await this.manager.find(type, {
          ...criteria,
          timeRange: {
            date: Between(
              DateUtil.toDateString(from),
              DateUtil.toDateString(to),
            ),
          },
        });
        results = this.toScheduleResults(datas, from, to);
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
      const tmpResults: ScheduleResult[] = (rs as IRoomSchedule).getScheduleResults(
        from,
        to,
      );
      results.push(...tmpResults);
    }
    return results;
  }

  public async findByTimeRange(
    type: any,
    timeRange: DatePeriodRange,
    criteria?: any,
  ): Promise<ScheduleResult[]> {
    let results: ScheduleResult[] = [];

    switch (type) {
      case Schedule:
        const schedRanges: any[] = await this.semRepository.findSchedules(
          timeRange.date,
          timeRange.date,
          {
            ...criteria,
            weekday: DateUtil.getWeekday(timeRange.date),
            period: In(
              ScheduleUtil.slicePeriods(
                timeRange.startPeriod,
                timeRange.endPeriod,
              ),
            ) as any,
          },
        );

        for (const range of schedRanges) {
          const partResults = this.toScheduleResults(
            range.schedules,
            range.from,
            range.to,
          );

          results.push(...partResults);
        }
        break;
      case ScheduleChange:
      case BookingForm:
      case MakeupCourseForm:
        const datas: any[] = await this.manager.find(type, {
          ...criteria,
          timeRange: timeRange.makeFindOption(),
        });
        results = this.toScheduleResults(datas, timeRange.date, timeRange.date);
        break;
    }
    return results;
  }
}
