import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, getCustomRepository } from 'typeorm';
import { Schedule, ScheduleChange } from '../../model/entity';
import { RoomScheduleRepository } from '../../model/repository';
import { CreateScheduleChangeDto } from './dto';
import { DatePeriodRange } from '../../model/common';

@Injectable()
export class ScheduleService implements OnModuleInit {
  private rsRepository: RoomScheduleRepository;

  constructor(
    @InjectRepository(ScheduleChange)
    private readonly schgRepository: Repository<ScheduleChange>,
  ) {}

  /**
   * 為了初始化自定義的Repository
   */
  onModuleInit() {
    this.rsRepository = getCustomRepository(RoomScheduleRepository);
  }

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
    const schg: ScheduleChange = new ScheduleChange(dto);
    console.log(schg);
    return await this.schgRepository.save(schg);
  }
}
