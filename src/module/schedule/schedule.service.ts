import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Schedule, ScheduleChange } from '../../model/entity';
import { CreateScheduleChangeDto } from './dto';

@Injectable()
export class ScheduleService {

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
}
