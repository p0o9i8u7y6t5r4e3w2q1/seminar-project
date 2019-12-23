import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCustomRepository, Repository } from 'typeorm';
import { Schedule, ScheduleChange } from '../../model/entity';
import {
  ScheduleResultRepository,
  ClassroomRepository,
} from '../../model/repository';
import { CreateScheduleChangeDto } from './dto';
import { ScheduleResult, DatePeriodRange } from '../../model/common';
import { arrayToObject } from '../shared';
import { DateUtil, Period, RoomStatus } from '../../util';

@Injectable()
export class ScheduleService implements OnModuleInit {
  private srRepository: ScheduleResultRepository;

  async onModuleInit() {
    // 自定義的repository目前只有這樣此方法可以運作
    this.srRepository = getCustomRepository(ScheduleResultRepository);
  }

  constructor(
    @InjectRepository(ScheduleChange)
    private readonly schgRepository: Repository<ScheduleChange>,
  ) {}

  // XXX 已直接用Semester Course保存時一併保存，應該不會用到
  /*
  async createSchedule(classroomID: string, scID: string, time: string) {
    await this.deleteSchedules(scID);
    const scheds = ScheduleUtil.parseSchedules(classroomID, scID, time);
    await this.schedRepository.insert(scheds);
  }
   */

  // XXX 已直接用Semester Course保存時一併保存，應該不會用到
  /*
  async deleteSchedules(scID: string): Promise<void> {
    await this.schedRepository.delete({ scID });
  }
   */
  async findScheduleChange(condition: any) {
    return await this.schgRepository.find(condition);
  }

  async createScheduleChange(dto: CreateScheduleChangeDto) {
    const schg: ScheduleChange = this.schgRepository.create(dto);
    return await this.schgRepository.save(schg);
  }

  async findCourseSchedule(scID: string, from: Date, to: Date) {
    return this.fetchScheduleResults(scID, from, to);
  }

  /**
   * 依學期課程id與時間範圍找出所有ScheduleResult
   * ScheduleChange會覆蓋Schedule的結果
   */
  private async fetchScheduleResults(
    scID: string,
    from: Date,
    to: Date,
  ): Promise<ScheduleResult[]> {
    const makeKey = (item: ScheduleResult) =>
      DateUtil.toDateString(item.date) + item.period + item.classroomID;

    const schedPromise = this.srRepository.find(Schedule, from, to, { scID });
    const schgPromise = this.srRepository.find(ScheduleChange, from, to, {
      scID,
    });

    const schedResultsObj: { [x: string]: ScheduleResult } = arrayToObject(
      await schedPromise,
      makeKey,
    );
    const schgResults = await schgPromise;

    // priority: Schedule < Schedule Change
    // 將schedule change覆蓋schedule結果
    for (const schgResult of schgResults) {
      const key = makeKey(schgResult);
      if (
        !schedResultsObj[key] ||
        schedResultsObj[key].isConflict(schgResult)
      ) {
        schedResultsObj[key] = schgResult;
      }
    }

    return Object.values(schedResultsObj)
      .sort(
        (a, b) =>
          DateUtil.diff(a.date, b.date) +
          (Period.indexOf(a.period) - Period.indexOf(b.period)) * 0.1,
      )
      .filter(item => item.status !== RoomStatus.SuspendedCourse);
  }
}
