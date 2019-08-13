import {
  EntityRepository,
  Repository,
  DeepPartial,
  SaveOptions,
  InsertResult,
} from 'typeorm';
import { Semester, Schedule } from '../entity';
import { DateUtil } from '../../util';

@EntityRepository(Semester)
export class SemesterRepository extends Repository<Semester> {
  /**
   * 為了處理跨學期、寒暑假上的問題
   * @return { from:Date, to:Date, schedules:Schedule[] }
   */
  async findSchedules(
    from: Date,
    to: Date,
    criteria: DeepPartial<Schedule>,
  ): Promise<any[]> {
    let temp: Date = from;
    const results: any[] = [];
    while (DateUtil.diffDays(temp, to) >= 0) {
      const yAndSem = DateUtil.getYearAndSemester(temp);
      const sem: Semester = await this.findOneOrFail(yAndSem);

      if (sem.isInCourseDate(temp)) {
        const result: any = { from: temp };
        const condition = Object.assign({}, yAndSem, criteria);
        if (DateUtil.diffDays(sem.courseEndDate, to) > 0) {
          // courseEndDate < to
          result.to = sem.courseEndDate;
          temp = DateUtil.nextDay(sem.semesterEndDate);
        } else {
          result.to = to;
          temp = DateUtil.nextDay(to);
        }
        result.schedules = await this.manager.find(Schedule, condition);
        results.push(result);
      } else if (DateUtil.diffDays(temp, sem.courseStartDate) > 0) {
        // before course date
        temp = sem.courseStartDate;
      } else {
        // temp > sem.courseEndDate
        temp = DateUtil.nextDay(sem.semesterEndDate);
      }
    }
    return results;
  }

  insert(data: Semester | Semester[]): Promise<InsertResult> {
    if (Array.isArray(data)) {
      for (const e of data) {
        (e as Semester).makeDefaultDates();
      }
    } else {
      (data as Semester).makeDefaultDates();
    }
    return super.insert(data);
  }

  save(
    data: Array<DeepPartial<Semester>>,
    options?: SaveOptions,
  ): Promise<Array<DeepPartial<Semester>>>;
  save(
    data: DeepPartial<Semester>,
    options?: SaveOptions,
  ): Promise<DeepPartial<Semester>>;
  async save(data: any, options?: any): Promise<any> {
    if (Array.isArray(data)) {
      for (const e of data) {
        (e as Semester).makeDefaultDates();
      }
    } else {
      (data as Semester).makeDefaultDates();
    }
    return super.save(data, options);
  }
}
