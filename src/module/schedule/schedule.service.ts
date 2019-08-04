import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Schedule, ScheduleChange } from '../../model/entity';
import { CreateScheduleChangeDto } from './dto';
import { ScheduleUtil, Period } from '../../util';

@Injectable()
export class ScheduleService {
  constructor(
    @InjectRepository(Schedule)
    private readonly schedRepository: Repository<Schedule>,
    @InjectRepository(ScheduleChange)
    private readonly schgRepository: Repository<ScheduleChange>,
  ) {}

  // XXX 或許不會用到
  /*
  async createSchedule(classroomID: string, scID: string, time: string) {
    await this.deleteSchedules(scID);
    const scheds = ScheduleUtil.parseSchedules(classroomID, scID, time);
    await this.schedRepository.insert(scheds);
  }
   */

  // XXX 或許不會用到
  async deleteSchedules(scID: string): Promise<void> {
    await this.schedRepository.delete({ scID });
  }

  async createScheduleChanges(dto: CreateScheduleChangeDto) {
    const schg: ScheduleChange = new ScheduleChange(dto);
    console.log(schg);
  }
}
