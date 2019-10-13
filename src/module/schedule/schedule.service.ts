import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { getCustomRepository, Repository } from 'typeorm';
import { Schedule, ScheduleChange } from '../../model/entity';
import { ScheduleResultRepository } from '../../model/repository';
import { CreateScheduleChangeDto } from './dto';
import { ScheduleResult } from '../../model/common';

@Injectable()
export class ScheduleService implements OnModuleInit {
  private srRepository: ScheduleResultRepository;

  onModuleInit() {
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
    const schedPromise = this.srRepository.find(Schedule, from, to, { scID });
    const schgPromise = this.srRepository.find(ScheduleChange, from, to, {
      scID,
    });

    const schedResults = await schedPromise;
    const schgResults = await schgPromise;

    // schedule change覆蓋schedule結果
    const len = schedResults.length;
    for (const schgResult of schgResults) {
      for (let i = 0; i < len; i++) {
        if (schedResults[i].isConflict(schgResult)) {
          schedResults[i] = schgResult;
          break;
        } else if (i === len - 1) {
          schedResults.push(schgResult);
        }
      }
    }

    return schedResults;
  }
}
