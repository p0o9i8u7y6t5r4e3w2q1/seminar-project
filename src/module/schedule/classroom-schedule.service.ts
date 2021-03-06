import { Injectable, OnModuleInit } from '@nestjs/common';
import { getCustomRepository, In } from 'typeorm';
import { FormPendingProgress, DateUtil, ScheduleUtil } from '../../util';
import {
  Classroom,
  Schedule,
  ScheduleChange,
  BookingForm,
  MakeupCourseForm,
  SemesterCourse,
} from '../../model/entity';
import {
  ScheduleResultRepository,
  ClassroomRepository,
} from '../../model/repository';
import {
  ClassroomDateSchedule,
  ScheduleResult,
  DatePeriodRange,
} from '../../model/common';
import * as _ from 'lodash/array';
import { DatePeriodRangeDto, arrayToObject, mapToArrayObject } from '../shared';

/**
 * NOTICE: ScheduleResult只有 push方式可以正常合併
 */
@Injectable()
export class ClassroomScheduleService {
  private srRepository: ScheduleResultRepository;
  private roomRepository: ClassroomRepository;

  onModuleInit() {
    // 自定義的repository目前只有這樣此方法可以運作
    this.srRepository = getCustomRepository(ScheduleResultRepository);
    this.roomRepository = getCustomRepository(ClassroomRepository);
  }

  async isConflict(classroomID: string, timeRange: DatePeriodRangeDto) {
    const schedules: ClassroomDateSchedule[] = await this.findClassroomDateSchedules(
      classroomID,
      timeRange.date,
      timeRange.date,
      false,
    );

    const periods = ScheduleUtil.slicePeriods(
      timeRange.startPeriod,
      timeRange.endPeriod,
    );
    return schedules[0].isConflict(periods);
  }

  /**
   * @param {boolean} withPending 決定要不要加上待審核狀態的訊息
   * 加上待審核狀態，速度可能會比較慢，需要的從資料庫讀取比較多資料
   */
  async findClassroomDateSchedules(
    classroomID: string,
    from: Date,
    to: Date,
    withPending: boolean,
  ): Promise<ClassroomDateSchedule[]> {
    from = DateUtil.startOfDate(from); // to avoid some bugs
    to = DateUtil.startOfDate(to); // to avoid some bugs

    const cdss = this.initClassroomDateSchedules(classroomID, from, to);
    const scheduleResults: ScheduleResult[] = await this.fetchScheduleResults(
      classroomID,
      from,
      to,
      withPending,
    );

    this.merge(cdss, scheduleResults);
    return cdss;
  }

  // 假設 ScheduleResults[] 已經照優先順序排好:
  // Schedule > ScheduleChange > BookingForm = MakeupCourseForm
  private merge(cdss: ClassroomDateSchedule[], roomResults: ScheduleResult[]) {
    const startDate: Date = cdss[0].date;
    for (const result of roomResults) {
      const idx = DateUtil.diffDays(result.date, startDate);
      const period = result.period;
      const oldResult = cdss[idx].getScheduleResult(period);
      if (
        oldResult == null ||
        ScheduleUtil.isPriorStatus(oldResult.status, result.status)
      ) {
        cdss[idx].setScheduleResult(period, result);
      }
    }
  }

  private initClassroomDateSchedules(
    classroomID: string,
    from: Date,
    to: Date,
  ): ClassroomDateSchedule[] {
    const cds: ClassroomDateSchedule[] = [];
    for (
      let date: Date = from;
      DateUtil.diffDays(to, date) >= 0;
      date = DateUtil.nextDay(date)
    ) {
      cds.push(new ClassroomDateSchedule({ classroomID, date }));
    }
    return cds;
  }

  private async fetchScheduleResults(
    classroomID: string,
    from: Date,
    to: Date,
    withPending: boolean,
  ): Promise<ScheduleResult[]> {
    const promises: Array<Promise<ScheduleResult[]>> = [];

    // combine promises to an array
    promises.push(this.srRepository.find(Schedule, from, to, { classroomID }));
    promises.push(
      this.srRepository.find(ScheduleChange, from, to, { classroomID }),
    );

    if (withPending) {
      const criteria = { classroomID, progress: In(FormPendingProgress) };
      promises.push(this.srRepository.find(BookingForm, from, to, criteria));
      promises.push(
        this.srRepository.find(MakeupCourseForm, from, to, criteria),
      );
    }

    // combine ScheduleResult[] together
    return Promise.all(promises).then((resultArr: ScheduleResult[][]) => {
      return _.flatten(resultArr);
      /*
      const results: ScheduleResult[] = [];
      for (const scheduleResults of resultArr) {
        results.push(...scheduleResults);
      }
      return results;
       */
    });
  }

  async loadCourseKeyObject(schedules: ClassroomDateSchedule[]) {
    const scForSearch = [];
    for (const schedule of schedules) {
      for (const result of Object.values(schedule.scheduleResults)) {
        if (result.key.type === SemesterCourse) {
          scForSearch.push(result);
        }
      }
    }
    // TODO
    await this.srRepository.loadKeyObject(scForSearch);
  }

  async findAvailableClassrooms(timeRange: DatePeriodRange) {
    const promises: Array<Promise<any>> = [];

    promises.push(this.srRepository.findByTimeRange(Schedule, timeRange));
    promises.push(this.srRepository.findByTimeRange(ScheduleChange, timeRange));

    const srArr: ScheduleResult[] = await Promise.all(promises).then(
      (srArrArr: ScheduleResult[][]) => {
        return _.flatten(srArrArr);
      },
    );
    const roomsSrArr = mapToArrayObject(
      srArr,
      (sr: ScheduleResult) => sr.classroomID,
    );

    const notAvailRoomIDs = Object.keys(roomsSrArr).filter(key => {
      const roomSrArr = roomsSrArr[key];
      const cds = new ClassroomDateSchedule({
        classroomID: key,
        date: timeRange.date,
      });
      this.merge([cds], roomSrArr);
      return !this.checkEmpty(cds, timeRange.startPeriod, timeRange.endPeriod);
    });

    const availRooms = await this.roomRepository.getAvailableClassrooms(
      notAvailRoomIDs,
    );

    /*
    const availRooms = await this.roomRepository.findAvailableClassrooms(
      timeRange,
    );
     */
    const dictRooms = arrayToObject(availRooms, 'id');
    const pendingRooms = await this.roomRepository.findPendingClassrooms(
      availRooms.map(x => x.id),
      timeRange,
    );
    for (const pRoom of pendingRooms) {
      dictRooms[pRoom].pending = true;
    }
    return Object.values(dictRooms);
  }

  public checkEmpty(
    cds: ClassroomDateSchedule,
    startPeriod: string,
    endPeriod: string,
  ) {
    for (const period of ScheduleUtil.slicePeriods(startPeriod, endPeriod)) {
      const sr = cds.getScheduleResult(period);
      if (sr && sr.isOccupy()) {
        return false;
      }
    }
    return true;
  }
}
